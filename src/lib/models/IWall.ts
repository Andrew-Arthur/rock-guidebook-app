import { IRoute } from "./IRoute"

export interface IWall {
    id: string
    name: string
    description: string
    location: {
        latitude: number
        longitude: number
    }
    routes: IRoute[]
    image: string
}