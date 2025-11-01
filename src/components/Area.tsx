"use client"

import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Inset,
    ScrollArea,
    Separator,
    Text,
} from "@radix-ui/themes"
import { SilentLink } from "./SilentLink"
import { AreaEntity } from "@/lib/types"
import { Scroll } from "lucide-react"
import { Fragment } from "react"

interface AreaProps {
    area: AreaEntity | null
    hoveredWallId: number | null
    setHoveredWallId: (id: number | null) => void
    editing: boolean
}

export default function Area({ area, hoveredWallId, setHoveredWallId, editing }: AreaProps) {
    if (!area) return null
    return (
        <div className="absolute z-10 top-10.5 left-12 h-[calc(100%-60px)] w-[calc(25%-38px)]">
            <Box width="100%" height="100%" asChild>
                <Card>
                    <Flex direction="column" gap="3">
                        <Box>
                            <Flex justify="between" align="center">
                                <Heading size="4">{area.details.name}</Heading>
                                <SilentLink href="/" replace={false} aria-label="Close menu">
                                    ✕
                                </SilentLink>
                            </Flex>
                        </Box>
                        <Inset side="x">
                            <ScrollArea scrollbars="horizontal" type="always">
                                <Box pb="3">
                                    <Flex>
                                        {area.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={`/api/images/${image.gcsImage.objectName}`}
                                                alt={area.details.name + index}
                                                className="h-120"
                                            />
                                        ))}
                                    </Flex>
                                </Box>
                            </ScrollArea>
                        </Inset>
                        <Box>
                            <Heading size="3">Description:</Heading>
                            <Text>{area.details.description}</Text>
                        </Box>
                        <Box>
                            <Heading size="3">Walls:</Heading>
                            <Inset side="x">
                                <ScrollArea scrollbars="vertical" type="hover">
                                    {area.walls.map((wall, index) => (
                                        <Fragment key={index}>
                                            {index !== 0 && (
                                                <Separator size="4" orientation="horizontal" />
                                            )}
                                            <Box
                                                width="100%"
                                                py="2"
                                                px="3"
                                                onMouseEnter={() => setHoveredWallId(wall.id)}
                                                onMouseLeave={() => setHoveredWallId(null)}
                                                className={`${wall.id === hoveredWallId ? "bg-black/20" : ""}`}
                                            >
                                                <SilentLink
                                                    href={`/?area=${area.id}&wall=${wall.id}`}
                                                    replace={false}
                                                >
                                                    <Flex direction="row" justify="between">
                                                        <Text>{wall.details.name}</Text>
                                                        <Text>
                                                            {wall._count.routes} Route
                                                            {wall._count.routes == 1 ? "" : "s"}
                                                        </Text>
                                                    </Flex>
                                                </SilentLink>
                                            </Box>
                                        </Fragment>
                                    ))}
                                </ScrollArea>
                            </Inset>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </div>
    )
}
