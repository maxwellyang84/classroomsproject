import mongoose, {Schema} from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const ActivitySchema = new Schema(
    {
        _id:{
            type: Schema.Types.ObjectId,
            required: true,
        },
        Start_Time:{
            type: String,
            trim: true,
            required: true,
        },
        Date:{
            type:Date,
            required: true,
        },
        Activity_Type:{
            type: String,
            trim: true,
            required: true,
        },
        Building:{
            type: String, 
            trim: true,
            required: true,
        },
        Building_Obj_Id:{
            type: Schema.Types.ObjectId,
            required: true,
        },
        Classroom:{
            type: Schema.Types.ObjectId,
            required: true,
        },
        Address: {
            type: String,
            required: true,
            trim: true,
        },
        Loc:{
            type: String,
        }
    },
    {
        collection: 'Activities',
    }
);

ActivitySchema.plugin(timestamps);

ActivitySchema.index({createdAt:1, updatedAt: 1});

export const Activity = mongoose.model('Activities', ActivitySchema);
export const ActivityTC = composeWithMongoose(Activity);