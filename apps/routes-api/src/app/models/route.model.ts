import {InterestingPlaces} from '@bike4life/commons'
import {Schema, model} from 'mongoose'

export interface Route {
    coordinates: number[][]
    date: Date
    name: string
    description: string
    estimatedDuration: number
    userId: string,
    userEmail?: string,
    _id?: string
    interestingPlaces?: InterestingPlaces[]
}

const routeSchema = new Schema<Route>({
    coordinates: {
        type: Schema.Types.Mixed,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimatedDuration: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: false
    },
    userEmail: {
        type: String,
        required: false
    }
})

export const RouteModel = model<Route>('Route', routeSchema)
