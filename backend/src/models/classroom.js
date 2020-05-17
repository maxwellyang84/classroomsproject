import mongoose, {Schema} from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {composeWithMongoose} from 'graphql-compose-mongoose';

export const ClassroomSchema = new Schema(
    {
        Name:{
            type: String,
            trim: true,
            required:true,
        },
        Building_Object_Id:{
            type: Schema.Types.ObjectId,
            ref: 'Buildings',
            required: true,
        },
        Building_Name: {
            type: String, 
            trim: true,
            required: true,
        },
        Building_Complete_Name:{
            type: String,
            trim: true,
            required: true,
        },
        Building_Abbrev_Name:{
            type: String,
            trim: true,
            required: true,
        },
        Classroom_Address:{
            type: String,
            trim: true,
            required: true,
        },
        Classroom_Capacity:{
            type: Number,
            trim: true,
            required: true,
        },
        Classroom_Specs:{
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
        collection: 'Classrooms',
    }
)

ClassroomSchema.plugin(timestamps);

ClassroomSchema.index({createdAt:1, updatedAt:1});

export const Classroom = mongoose.model('Classrooms', ClassroomSchema);

export const ClassroomTC = composeWithMongoose(Classroom);
