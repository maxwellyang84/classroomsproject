import mongoose, {Schema} from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const ActivitySchema = new Schema(
    {
        activitytype:{
            type: String, 
            enum: ['LEC', 'SEM'],
            trim: true,
            required: true,
        },
        activityname:{
            type: String,
            trim: true,
            required: true,
        },
        building:{
            type: Schema.Types.ObjectId,
            ref: 'Buildings',
            required: false,
        },
        classroom:{
            type: Schema.Types.ObjectId,
            ref: 'Classrooms',
            required: false,
        },
        date:{
            type: Date,
            required: false,
        },
    },
    {
        collection: 'Activities',
    }
);

ActivitySchema.plugin(timestamps);

ActivitySchema.index({createdAt:1, updatedAt: 1});

export const Activity = mongoose.model('Activities', ActivitySchema);
export const ActivityTC = composeWithMongoose(Activity);