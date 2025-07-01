import { IWallPreview } from './IWallPreview';

export interface IArea {
    id: string
    name: string
    description: string
    location: {
        latitude: number
        longitude: number
    }
    walls: IWallPreview[]
    images: string[]
}