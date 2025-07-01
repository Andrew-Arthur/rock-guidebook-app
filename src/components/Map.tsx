'use client'

import React, { useEffect, useRef } from "react"
import { IArea } from "@/lib/models/IArea"
import { usePathname, useSearchParams } from "next/navigation"
import { getGeoJsonAvgCoord } from "@/lib/services/geoJsonService"
import mapboxgl, { GeoJSONFeature } from "mapbox-gl"
import { getWallsGeoJson } from "@/lib/services/areaService"
import { getMapGeoJson } from "@/services/mapService"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

interface MapProps {
  area: IArea | null
  hoveredWallId: string | null
  setHoveredWallId: (id: string | null) => void
}

export default function Map({
  area = null,
  hoveredWallId,
  setHoveredWallId,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const hoveredFeatureRef = useRef<GeoJSONFeature | null>(null)

  // first render only
  useEffect(initMap, [])

  // after first render
  useEffect(() => {
    if (!mapRef.current?.isStyleLoaded()) return
    if (area) {
      viewSpecificArea()
    } else {
      viewAllAreas()
    }
  }, [area])

  useEffect(() => {
    if (!mapRef.current || !mapRef.current?.isStyleLoaded()) return
    setHoveredFeatureByWallID(hoveredWallId)
  }, [hoveredWallId])

  return <div ref={mapContainer} className="h-full w-full flex-2/3"></div>

  function getCenter(): [number, number] {
    return (area) ? [area.location.longitude, area.location.latitude] : getGeoJsonAvgCoord()
  }
  function getZoom(): number {
    return (area) ? 18 : 6
  }
  function getSpeed(): number {
    return (area) ? 1.2 : 3
  }
  function initMap() {
    if (mapRef.current) return
    const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: getCenter(),
        zoom:   getZoom(),
    })
    mapRef.current = map
    map.addControl(new mapboxgl.NavigationControl(), 'top-left')
    map.on('load', () => {
        map.addSource("dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxzoom: 14
        });
        map.setTerrain({ source: "dem", exaggeration: 1.5 });
        if (!area) {
            loadAreas()
        } else {
            loadWalls()
        }
    })
    return () => {
      mapRef.current?.remove()
    }
  }
  async function loadAreas() {
    const map = mapRef.current!
    if (map.getLayer('areas-layer')) return

    const geoJson = await getMapGeoJson()

    map.addSource('areas', { type: 'geojson', data: geoJson })
    map.addLayer({
        id: 'areas-layer',
        type: 'circle',
        source: 'areas',
        layout: {
          'circle-sort-key': 2
        },
        paint: {
            'circle-color': '#e55e5e',
            'circle-radius': 8,
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 2,
        },
    })
    map.addLayer({
      id: 'areas-layer-count',
      type: 'symbol',
      source: 'areas',
      layout: {
        'text-field': ['to-string', ['get', 'routeCount']],
        'text-size': 12,
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-anchor': 'center',
        'text-offset': [0, 0],
      },
      paint: {
        'text-color': '#fff',
        'text-halo-color': '#000',
        'text-halo-width': 1,
      },
    });
    map.on('mouseenter', 'areas-layer', () => {
        map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'areas-layer', () => {
        map.getCanvas().style.cursor = ''
    })
    map.on('click', 'areas-layer', (e) => {
        const feature = e.features![0]!
        const id = feature.properties?.id
        const params = new URLSearchParams(searchParams.toString())
        params.set('area', id)
        window.history.pushState(null, '', pathname + '?' + params.toString())
    })
  }
  function loadWalls() {
    const map = mapRef.current!
    if (map.getLayer('walls-layer')) return

    map.addSource('walls', {
      type: 'geojson',
      data: getWallsGeoJson(area!),
      promoteId: 'id'
    })
    map.addLayer({
        id: 'walls-layer',
        type: 'circle',
        source: 'walls',
        layout: {
          'circle-sort-key': 1
        },
        paint: {
            'circle-color':        ['case', ['boolean', ['feature-state', 'hover'], false], '#E19015', '#E9CA3F'],
            'circle-radius':       8,
            'circle-stroke-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#E19015', '#E9CA3F'],
            'circle-stroke-width': 2,
            'circle-opacity':      0.6,
        },
    })
    
    map.on('mouseenter', 'walls-layer', (e) => {
        const feature = e.features![0]!
        setHoveredWallId(feature.id as string | null)
        map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'walls-layer', () => {
        setHoveredWallId(null)
        map.getCanvas().style.cursor = ''
    })
    map.on('click', 'walls-layer', (e) => {
      const feature = e.features![0]!
      const id = feature.properties?.id
      
      const params = new URLSearchParams(searchParams.toString())
      params.set('wall', id)
      window.history.pushState(null, '', pathname + '?' + params.toString())
    })

    map.getLayer('walls-layer')
  }
  async function viewAllAreas() {
    const map = mapRef.current!
    if (!map.getLayer('areas-layer')) await loadAreas()
    map.resize()
    map.setLayoutProperty('areas-layer', 'visibility', 'visible')
    map.setLayoutProperty('areas-layer-count', 'visibility', 'visible')
    flyToPoint()
    map.once('moveend', () => {
      map.setLayoutProperty('walls-layer', 'visibility', 'none')
    })
  }
  function viewSpecificArea() {
    const map = mapRef.current!
    if (!map.getLayer('walls-layer')) loadWalls()
    map.resize()
    map.setLayoutProperty('walls-layer', 'visibility', 'visible')
    map.setLayoutProperty('areas-layer', 'visibility', 'none')
    map.setLayoutProperty('areas-layer-count', 'visibility', 'none')
    flyToPoint()
  }
  function flyToPoint() {
    mapRef.current!.flyTo({ 
      center: getCenter(), 
      zoom:   getZoom(),
      speed:  getSpeed(),
    })
  }
  function setHoveredFeature(feature: GeoJSONFeature | null) {
    const map = mapRef.current!
    const oldFeature = hoveredFeatureRef.current
    if (oldFeature && (!feature || oldFeature.id !== feature.id)) {
      map.setFeatureState(oldFeature, { hover: false })
    }
    if (feature) {
      map.setFeatureState(feature, { hover: true })
    }
    hoveredFeatureRef.current = feature
  }
  function setHoveredFeatureByWallID(id: string | null) {
    const feature = (id) ? mapRef.current!.queryRenderedFeatures({ filter: ['==', 'id', id] })[0] : null
    return setHoveredFeature(feature)
  }
}




 



