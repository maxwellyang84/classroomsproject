// function add(a, b) { 
// return a+b 
// } 
// console.log(add(4, 6))

const {MongoClient} = require('mongodb');


async function doQuery(client){
    var database = await client.db("UBC_ClassroomFinder_DataBase_V4");
    const activities = await database.collection("2019-09-20");

    console.time('Query')

    const filteredActivities = await activities.aggregate([
        { $geoNear: {
            near: { type: "Point", coordinates: [ -123.2533532 , 49.2701102 ] },
            spherical: true,
            distanceField: "Distance",
            maxDistance: 2000
        }},
        { $match:{Date_Time: {$gte:new Date("2019-09-20T12:00:00.000Z") , $lt:new Date("2019-09-20T17:00:00.000Z") } } },      
        {
         $group: 
         {
             _id: "$Classroom",
             Classroom: {$addToSet: "$Classroom"},
             Building: {$addToSet: "$Building"},
             Loc: {$addToSet: "$Loc"},
             Date: {$addToSet: "$Date"},
             Week_Date: {$addToSet: "$Date"},
             Address: {$addToSet: "$Address"},
             Building_Obj_id: {$addToSet: "$Building_Obj_id"},
             Classroom_Obj_id: {$addToSet: "$Classroom_Obj_id"},
             Distance: {$addToSet: {$toInt: { $mod: [ "$Distance", 100 ] }}},
             Times: { $push:"$Start_Time" },
             Activities: {$push:"$Activity_Type"},
             Number_Non_Empty_Activities: { $sum: { "$cond": [ {$eq: [ "$Activity_Type", "Empty" ]}, 0, 1 ]} }
         }
        },
        { $addFields: { "Score": {$multiply: [ {$sum: ["$Number_Non_Empty_Activities", 1]} , {$sum: [{$arrayElemAt: [ "$Distance", 0 ]}, 1]} ] } }  },
        {$sort: {Score: 1}},
        { $limit : 10 }
    ]).toArray();
    
    console.timeEnd('Query')

    console.log(typeof(filteredActivities));
    console.log(filteredActivities.length);
    console.log(filteredActivities[0]);
    
    client.close();
};

async function main(){
    /**
     * Connection URI. Update <username>, <passw ord>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://dbVala:Aa123456@cluster0-dcbd6.mongodb.net/test?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  doQuery(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);