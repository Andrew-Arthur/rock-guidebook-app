import { RouteEntity } from "@/lib/types"
import { useEffect, useState } from "react"
import ToggleInput from "./ToggleInput"
import { Route as PathIcon, PencilRuler } from "lucide-react"
import { Box, Button, Flex, Heading, IconButton, Separator, Text } from "@radix-ui/themes"

export default function RouteListing({
    route,
    hoveredRouteId,
    setHoveredRouteId,
    selectedRouteId,
    setSelectedRouteId,
    editing,
    addMode = false,
}: {
    route: RouteEntity
    hoveredRouteId: number
    setHoveredRouteId: (id: number) => void
    selectedRouteId: number
    setSelectedRouteId: (id: number) => void
    editing: boolean
    addMode?: boolean
}) {
    const hovered = hoveredRouteId === route?.id
    const selected = selectedRouteId === route?.id
    const [showVideo, setShowVideo] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(addMode)

    useEffect(() => {
        if (!editing) setEditMode(false)
    }, [editing])

    useEffect(() => {
        if (!selected) {
            setShowVideo(false)
            setEditMode(false)
        }
    }, [selected])

    if (!route) return null

    return (
        <Flex
            direction="column"
            asChild
            width="100%"
            p="3"
            gap="3"
            className={`${hovered && !selected ? "bg-black/20" : ""}`}
            onMouseEnter={() => setHoveredRouteId(route.id)}
            onMouseLeave={() => setHoveredRouteId(NaN)}
            onClick={() => !editMode && setSelectedRouteId(selected ? NaN : route.id)}
        >
            <form className="w-full">
                <Flex justify="between">
                    <Flex gap="3" align="center">
                        <ToggleInput name="grade" value={route.grade} edit={editMode} />
                        <Separator size="1" orientation="vertical" />
                        <ToggleInput name="name" value={route.details.name} edit={editMode} />
                    </Flex>
                    <Flex gap="3">
                        {editing && (
                            <IconButton
                                type="button"
                                size="1"
                                radius="full"
                                onClick={(event) => {
                                    if (editMode) {
                                    } else {
                                        event.stopPropagation()
                                        setEditMode(true)
                                        setSelectedRouteId(route.id)
                                    }
                                }}
                            >
                                {editMode ? (
                                    <PathIcon className="w-5 h-5" />
                                ) : (
                                    <PencilRuler className="w-5 h-5" />
                                )}
                            </IconButton>
                        )}
                        <Text>{"★".repeat(route.rating) + "☆".repeat(5 - route.rating)}</Text>
                        <Text>{selected ? "▲" : "▼"}</Text>
                    </Flex>
                </Flex>
                {selected && (
                    <Box>
                        <Heading size="3">Description:</Heading>
                        <ToggleInput
                            name="description"
                            value={route.details.description}
                            edit={editMode}
                            multiline
                        />
                    </Box>
                )}
                {editMode && (
                    <Flex justify="end" gap="2">
                        <Button type="button" color="gray" onClick={() => setEditMode(false)}>
                            Cancel
                        </Button>
                        <Button type="button" color="red">
                            Delete
                        </Button>
                        <Button type="submit" color="green">
                            Save
                        </Button>
                    </Flex>
                )}
            </form>
        </Flex>
    )
}
