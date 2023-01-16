import { InterestingPlaces } from '@bike4life/commons'
import { Schema, model } from 'mongoose'

const interestingPlacesSchema = new Schema<InterestingPlaces>({
    xid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    kinds: {
        type: String,
        required: true
    },
    osm: {
        type: String,
        required: false
    },
    wikidata: {
        type: String,
        required: false
    },
    point: {
        type: Schema.Types.Mixed,
        required: true
    },
    rate: {
        type: Number,
        required: false
    },
    routeId: {
        type: String,
        required: true
    }
})

export const InterestingPlacesModel = model<InterestingPlaces>('InterestingPlaces', interestingPlacesSchema)
