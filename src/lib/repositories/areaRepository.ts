'use server'
import { IArea } from "@/lib/models/IArea"
import { IWall } from "@/lib/models/IWall"

export async function fetchAreaById(areaID: string): Promise<IArea | null> {
    let area: IArea | null = null;
    if (areaID === '1') {
        area = {
            id: '1',
            name: 'Tonkawa Falls Park',
            description: 'A beautiful park with a waterfall and climbing routes.',
            location: {
                latitude: 31.53701,
                longitude: -97.43095,
            },
            walls: [
                {
                    id: '3',
                    name: 'Craw Cave',
                    location: [-97.43064880733091, 31.53628283766936]
                },
                {
                    id: '2',
                    name: 'Hidden Cave',
                    location: [-97.4311823879023, 31.537103334397983]
                },
                {
                    id: '1',
                    name: 'Wall 1',
                    location: [-97.43126790631025, 31.536957126587524]

                },
            ],
            images: [
                '/tonk-1.jpg',
                '/tonk-2.jpg',
            ]
        }
    }
    if (areaID === '4') {
        area = {
            id: '4',
            name: 'Guadalupe Peak',
            description: 'Look its so cool.',
            location: {
                latitude: 31.891480,
                longitude: -104.860726,
            },
            walls: [],
            images: [],
        }
    }
    return area
}

export async function fetchWallById(areaID: string, wallID: string): Promise<IWall | null> {
    if (areaID === '1' && wallID === '3') return {
        id: '3',
        name: 'Craw Cave',
        description: 'Descend the stairs behind the pavilion and follow the trail along the wall until you come to a large cave with a stone bench. This is Craw Cave, the classic cave of Tonk. The classic route is Cromagination v10, which has many shorter variations for all experiene levels.',
        image: 'craw-cave.png',
        location: {
            longitude: -97.43064880733091,
            latitude: 31.53628283766936
        },
        routes: [
            {
                id: '1',
                name: 'La Salida',
                grade: 'v2',
                description: 'Same start as Sucker Punch, but move up and right to the sloping lip and follow the lip as it curves right and top out on jugs.',
                rating: 1,
                svg: [
                    [100, 550],
                    [150, 450],
                    [250, 400],
                ],
            },
            {
                id: '2',
                name: 'Friends',
                grade: 'v5',
                description: 'A challenging route with a crux at the top.',
                rating: 4,
                svg: [
                    [800, 680],
                    [970, 670],
                    [990, 660],
                    [1060, 610],
                    [1190, 600],
                ],
                video: 'r_UzDj_6RSI',
            },
            {
                id: '3',    
                name: 'Breakeation',
                grade: 'v6',
                description: 'A steep route with a lot of overhangs.',
                rating: 3,
                svg: [
                    [1670, 500],
                    [1910, 450],
                    [2000, 300],
                ],
                video: 'SaEpA8mIrcQ',
            },
            {
                id: '4',
                name: 'Cromagination',
                grade: 'v10',
                description: 'Classic route. Start with Cro Magnen and finish out Breakeation.',
                rating: 5,
                svg: [
                    [800, 680],
                    [970, 670],
                    [990, 660],
                    [1060, 610],
                    [1190, 600],
                    [1280, 515],
                    [1400, 485],
                    [1670, 500],
                    [1910, 450],
                    [2000, 300],
                ],
                },
            {
                id: '5',
                name: 'Cro Magnen',
                grade: 'v7',
                description: 'Start on the big hueco in the back of cave and traverse out right and up through huecos. The last move is a horizontal dyno off a small right hand crimp to a massive jug over the lip of the cave.',
                rating: 2,
                svg: [
                    [800, 680],
                    [970, 670],
                    [990, 660],
                    [1060, 610],
                    [1190, 600],
                    [1280, 515],
                    [1400, 485],
                    [1460, 365],
                    [1570, 290],
                    [1540, 60],
                ],
            },
        ],
    }
    if (areaID === '1' && wallID === '2') return {
        id: '2',
        name: 'Hidden Cave',
        description: 'This is the huge cave closest to the waterfall. Take the limestone stairs down to the Meadow and turn left. It may be slightly hidden behind a pile of large rocks, but you can’t miss it.',
        image: 'hidden-cave.png',
        location: {
            longitude: -97.4311823879023,
            latitude: 31.537103334397983
        },
        routes: [
            {
                id: '1',
                name: 'Flesh Wound',
                grade: 'v7',
                description: 'Start standing in the left side of the cave on a huge tufa at head height and climb straight up through two good huecos reaching a very sloped hueco, then pull the bulge for the top out.',
                rating: 5,
                svg: [
                    [540, 670],
                    [600, 530],
                    [450, 410],
                    [360, 300],
                    [420, 110],
                ],
                video: '7nv93bHm21k',
            },
            {
                id: '2',
                name: 'Bloc Problem',
                grade: 'v4',
                description: 'Start in the center of the cave on tufas and climb up though huge huecos and end in the small black hueco beside the large one in the center of the roof.',
                rating: 2,
                svg: [
                    [1100, 670],
                    [1110, 505],
                    [1100, 440],
                ],
            },
            {
                id: '3',
                name: 'Hueco Problem',
                grade: 'v??',
                description: 'Start in the cave just before it curves right on a tufa and pull into a big hueco and traverse right through another hueco closer to the slab. Try to reach a high ledge on the arête part of the slab and finish out on slab.',
                rating: 0,
                svg: [
                    [1440, 680],
                    [1380, 505],
                    [1400, 465],
                    [1620, 415],
                    [1660, 330],
                    [1630, 230],
                ],
            },
        ],
    }
    return null
}