# This program creates the classroom collection using the classroom info json file
# and file and the building object Ids in the buildings collection
import json
from googlemaps import Client as GoogleMaps
import pymongo
databaseName = "UBC_ClassroomFinder_DataBase_V5"


def run():
    """[Function for creating the classroom collection in the UBC_ClassroomFinder_DataBase database]
    """
    print("Started flooding the Classrooms collection ...")
    
    classroomInfoJsonFileName = "/home/vala/Documents/MaxwelProject/page_request/json_data/classroom_info.json"


    with open(classroomInfoJsonFileName) as f:
        classroomInfoDictionary = json.load(f)

    # We also get all the classrooms for which we have the schedule website
    # We do this step with a set just to make sure we don't have any duplicate classrooms
    classroomList = set()
    for classroomName in classroomInfoDictionary.keys():
        classroomList.add(classroomName)

    # Now we connect to the databse and fill the mongo db database
    # User and password go here
    client = pymongo.MongoClient("mongodb+srv://dbVala:Aa123456@cluster0-dcbd6.mongodb.net/test?retryWrites=true&w=majority")
    db = client.get_database(databaseName)
    buildingsCollection = db.Buildings

    # Now we create the Classrooms list
    UBCClassroomList = []
    for classroomName in classroomList:
        buildingName = classroomName.split(" ")[0].strip()
        buildingQuery = { "Abbrev_Name": buildingName }
        buildingDataList = list(buildingsCollection.find(buildingQuery))
        
        if len(buildingDataList) != 1:
            print("Error, for building code " + buildingName + " we might have duplicate data.")
            print("Please conside checking the buildings database for cuplicates")
        # Get the first building as the targetted building data
        buildingData = buildingDataList[0]

        # We put the data into a list of dictionaries
        buildingObjectID = buildingData["_id"]
        classroomBuildingCompleteName =  buildingData["Complete_Name"]
        classroomBuildingAbbrevName =  buildingData["Abbrev_Name"]
        classroomAddress = buildingData["Address"]
        classroomLng = buildingData["Loc"]["coordinates"][0]
        classroomLat = buildingData["Loc"]["coordinates"][1]
        classroomCapacity = classroomInfoDictionary[classroomName]["classroomCapacity"]
        classroomSpecs = classroomInfoDictionary[classroomName]["classroomSpecs"]
        classroomDictionary = {
            "Name":classroomName,
            "Building_Obj_id": buildingObjectID,
            "Building_Name": buildingName,
            "Building_Complete_Name": classroomBuildingCompleteName,
            "Building_Abbrev_Name": classroomBuildingAbbrevName,
            "Classroom_Address": classroomAddress,
            "Classroom_Capacity": classroomCapacity,
            "Classroom_Specs": classroomSpecs,
            "Loc": {
                        "type": "Point",
                        "coordinates":[classroomLng, classroomLat]
                   }
        }
        UBCClassroomList.append(classroomDictionary)

    # Now we retrieve the Classrooms collection
    classroomsCollection = db.Classrooms

    # Adding the location and building name and classroom name indices
    classroomsCollection.drop_indexes()
    buildingsCollection.ensure_index( [("Loc", pymongo.GEOSPHERE) ] )
    classroomsCollection.ensure_index( [("Name", pymongo.ASCENDING)] )
    classroomsCollection.ensure_index( [("Building_Name", pymongo.ASCENDING)] )

    # Finally we enter elements into the database on by one
    # TODO: Remember to add indexing
    for dictClassroom in UBCClassroomList:
        classroomsCollection.insert_one(dictClassroom)
    

    print("Flooding the Classrooms collection complete.")
    return


run()