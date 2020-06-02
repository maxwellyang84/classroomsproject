import mongoose from 'mongoose'
import {Activity} from './models/activity'
import {Day} from './models/day'

export const resolvers = {
    Query:{
        getActivities: ()=> Activity.find().limit(3),
        getClassrooms: ()=>"Hello",
        getBuildings: ()=>Building.find(),
        getDay: async (parent, args, context)=> {
            const sortBy = {}
            if(args.sortBy){
                sortBy[args.sortBy.field] = args.sortBy.order === 'ASC' ? 1: -1
            }
            return await Day.find({}).sort(sortBy).limit(5)
        },
        getTopClassrooms:()=>"Hello",
    },
    Day:{
        ActivityCount: parent =>{
            return parent.Classroom_Activities.length
        },
        ActivityFeed: async (parent, {first, cursor})=>{
            const day = await Day.find({"Classroom_Activities":{"$elemMatch":{"Activity_ID": "5eba71d4a5d148323a4fbdae"}}})
            console.log(day)
            return {
                cursor: cursor,
                Classroom_Activity: day
            }
        }
    }
}