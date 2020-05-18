from pymongo import MongoClient
from datetime import datetime, timedelta
# from bson.son import SON

databaseName = "UBC_ClassroomFinder_DataBase_V3"
client = MongoClient("mongodb+srv://dbVala:Aa123456@cluster0-dcbd6.mongodb.net/test?retryWrites=true&w=majority")
db = client.get_database(databaseName)
activitiesCollection = db.Activities
classroomsCollection = db.Classrooms


gte = datetime.strptime("10/12/19 12:00:00", '%m/%d/%y %H:%M:%S')
let = datetime.strptime("10/12/19 19:00:00", '%m/%d/%y %H:%M:%S')

# activities = activitiesCollection.find({"Date_Time": { 
# '$gte':gte , 
# '$lt': let
# }
# })

start = datetime.now()


groupedActivities = activitiesCollection.aggregate([
 {"$match": { "$and": [{"Date_Time": {'$gte':gte , '$lt': let} } , {"Activity_Type": "Empty"}]} },
 {"$group": { "_id": 
                {"Classroom":"$Classroom",
                "Building": "$Building",
                "loc":"$loc" ,  
                "Address":"$Address",
                "Building_Obj_id":"$Building_Obj_id",
                "Classroom_Obj_id":"$Classroom_Obj_id",
                "Week_Day":"$Week_Day"
                } ,
                "Activity_Slots": 
                { 
                    "$addToSet": {"Start_Time": "$Start_Time", "Activity_Type":"$Activity_Type" } 
                },
                "Number_Of_Activities": {"$sum":1}
            } 
 },
 {"$sort": {"Number_Of_Activities":-1}
 }
])

end = datetime.now()

input(end -start)

count = 0
for obj in groupedActivities:
    print(obj)
    count += 1
    input()
print("----->", str(count))



# for doc in activitiesCollection.find({"loc": {"$near": [-123.2533532, 49.2701102}}).limit(3):
#     print(doc)

# closeClassses = classroomsCollection.aggregate([
#      { "$geoNear": {
#          "near": [-123.2533532, 49.2701102],
#          "maxDistance": 0.01261617096,
#          "distanceField": "distance",
#          "includeLocs": "latlng",
#          "uniqueDocs": True,
#          "spherical":True,
#          "$limit":100
#      }},
#      { "$sort": { "other": 1, "distance": 1 } }
# ])


# count = 0
# for obj in closeClassses:
#     print(obj)
#     count += 1
#     input()
# print("----->", str(count))


# stargroup=db.reviews.aggregate(
# # The Aggregation Pipeline is defined as an array of different operations
# [
# # The first stage in this pipe is to group data
# { '$group':
#     { '_id': "$rating",
#      "count" : 
#                  { '$sum' :1 }
#     }
# },
# # The second stage in this pipe is to sort the data
# {"$sort":  { "_id":1}
# }
# # Close the array with the ] tag             
# ] )