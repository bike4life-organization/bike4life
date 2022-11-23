import {Schema, model}  from 'mongoose'

export interface Route{
    coordinates: Number[][]
    date: Date
    name: string
    description: string
    estimatedDuration: number
    userId: string

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
    }
    
})

export const RouteModel = model<Route>('Route', routeSchema)
