import mongoose, {Schema} from 'mongoose';
import timestamps from 'mongoose-timestamp'
import {composeWithMongoose} from 'graphql-compose-mongoose'

export const ClassroomActivitiesSchema = new Schema(
    {
        Start_Time:{
            type: String,
            trim: true,
            required: true
        },
        Date:{
            type: String,
            trim: true,
            required: true,
        },
        Week_Day:{
            type:String,
            trim: true,
            required: true,
        },
        Date_Time:{
            type: Date,
            required: true,
        },
        Activity_Type:{
            type: String,
            required: true,
        },
        Activity_ID:{
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        _id: false
    }
)
export const DaySchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId,
        required: true
    },
    Start_Time:{
        type: String,
        trim: true,
        required: true
    },
    Date:{
        type:String,
        trim: true,
        required: true
    },
    Week_Day:{
        type:String,
        trim: true,
        required:true,
    },
    Date_Time_Days_Only:{
        type: Date,
        required: true
    },
    Building:{
        type: String,
        trim: true,
        required: true,
    },
    Building_Obj_id:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    Classroom:{
        type: String,
        required: true,
        trim: true
    },
    Classroom_Obj_id:{
        type: Schema.Types.ObjectId,
        required: true
    },
    Classroom_Activities:{
        type: [ClassroomActivitiesSchema],
        required: true,
        index: true
    }
},{
    collection: '2019-09-18'
})

DaySchema.plugin(timestamps)

export const Day = mongoose.model('Day', DaySchema)
export const DayTC = composeWithMongoose(Day)

function addActivityCountResolver(TC, Model){
    TC.addResolver({
        name: 'getActivityCount',
        type: Number,
        kind: 'query',
        resolve: ({source, args})=>{
            let rootAggregate = Model.aggregate()
            if (source && source._id) {
                rootAggregate.match({ _id: { $ne : source._id }})
            }
            rootAggregate.project({activitycount:{$size:'$Classroom_Activities'}})
            
            return rootAggregate.then(results => results.map(obj => Model.hydrate(obj)));
        }
    })
}

addActivityCountResolver(DayTC, Day);
DayTC.addRelation(
    'activitycount',
    {
        resolver: DayTC.getResolver('getActivityCount'),
        projection: {_id: true}
    }
)