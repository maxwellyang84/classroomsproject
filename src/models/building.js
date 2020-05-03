import mongoose, {Schema} from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';


// const pointSchema = new mongoose.Schema({
//     type: {
//       type: String,
//       enum: ['Point'],
//       required: true
//     },
//     coordinates: {
//       type: [Number],
//       required: true
//     }
//   });

export const BuildingSchema = new Schema(
    {
        Complete_Name:{
            type:String,
            trim: true,
            required: true,
        },
        Abbrev_Name:{
            type:String,
            trim: true,
            required: true,
        },
        Address:{
            type: String,
            trim: true,
            required: true,
        },
        Lat:{
            type: Number,
            required: true,
        },
        Lng:{
            type: Number,
            required: true,
        }

    },
    {
        collection: 'Buildings',
    }
)

BuildingSchema.plugin(timestamps);

BuildingSchema.index({createdAt:1, updatedAt:1});

export const Building = mongoose.model('Buildings', BuildingSchema);
export const BuildingTC = composeWithMongoose(Building);