import mongoose from 'mongoose'
import {Activity} from './models/activity'

export const resolvers = {
    Query:{
        getActivities: ()=> Activity.findOne(),
        getClassrooms: ()=>"Hello",
        getBuildings: ()=>"HEllo",
        getTopClassrooms:()=>"Hello",
    }
}