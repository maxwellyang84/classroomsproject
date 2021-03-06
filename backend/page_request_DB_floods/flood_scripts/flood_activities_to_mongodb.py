import json
import pymongo
import sys
from tqdm import tqdm
from tqdm import tqdm_gui
from datetime import datetime
databaseName = "UBC_ClassroomFinder_DataBase_V5"
weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

def run():
    """[Function for creating the Activities collection in the UBC_ClassroomFinder_DataBase database]
    """
    print("Started flooding the Activities collection ...")
    
    classroomScheduleJsonFileName = "/home/vala/Documents/MaxwelProject/page_request/json_data/classroom_schedule.json"

    with open(classroomScheduleJsonFileName) as f:
        dictionaryScheduleJson = json.load(f)

    # Now we connect to the databse and fill the mongo db database
    # User and password go here
    client = pymongo.MongoClient("mongodb+srv://dbVala:Aa123456@cluster0-dcbd6.mongodb.net/test?retryWrites=true&w=majority")
    db = client.get_database(databaseName)
    buildingsCollection = db.Buildings
    classroomsCollection = db.Classrooms

    # Now we create the Activities list
    print("Gathering activity data")

    # These two dictionaries are cached to reduce the process time
    UBCBuildingDataDictionary = {}
    UBCClassroomDataDictionary = {}

    UBCActivityList = []
    for date in dictionaryScheduleJson.keys():
        thisDayClasses = dictionaryScheduleJson[date]

        for classroomName in thisDayClasses.keys():
            classroomSchedule = thisDayClasses[classroomName]

            for timeslot in classroomSchedule.keys():
                timeslotActivity = classroomSchedule[timeslot]

                # This is for printing
                sys.stdout.write("\r Number of activities found: %d" %len(UBCActivityList))
                sys.stdout.flush()
                
                # First we retrieve the building data 
                buildingName = classroomName.split(" ")[0].strip()
                # We cache the classroom data
                if buildingName in UBCBuildingDataDictionary.keys():
                    buildingData = UBCBuildingDataDictionary[buildingName]
                else:   
                    buildingQuery = { "Abbrev_Name": buildingName }
                    buildingDataList = list(buildingsCollection.find(buildingQuery))
                    if len(buildingDataList) != 1:
                        print("Error, for building code " + buildingName + " we might have duplicate data.")
                        print("Please conside checking the buildings database for duplicates")
                    # Get the first building as the targetted building data
                    buildingData = buildingDataList[0]
                    UBCBuildingDataDictionary[buildingName] = buildingData
                buildingObjectID = buildingData["_id"]

                # We also retireve the classroom data
                # We cache the building data
                if classroomName in UBCClassroomDataDictionary.keys():
                    classroomData = UBCClassroomDataDictionary[classroomName]
                else:  
                    classroomQuery = { "Name": classroomName }
                    classroomDataList = list(classroomsCollection.find(classroomQuery))
                    if len(classroomDataList) != 1:
                        print("Error, for classroom code " + classroomName + " we might have duplicate data.")
                        print("Please conside checking the classroom database for duplicates")
                    # Get the first classroom as the targetted building data
                    classroomData = classroomDataList[0]
                    UBCClassroomDataDictionary[classroomName] = classroomData

                classroomObjectID = classroomData["_id"]
                activityAddress = classroomData["Classroom_Address"]
                classroomLng = classroomData["loc"][0]
                classroomLat = classroomData["loc"][1]

                # Here we also create the datetime object
                datetimeString = date.split("-")[1] + "/" + date.split("-")[2] + "/" + date.split("-")[0][2:] + " " + timeslot + ":00"
                datetimeObject = datetime.strptime(datetimeString, '%m/%d/%y %H:%M:%S')
                weekDay =  weekDays[datetimeObject.weekday()]

                # We only consider timeslot that don't have an empty activity string
                if timeslotActivity != "Empty":
                    dictionaryObject = {
                        "Start_Time": timeslot,
                        "Date": date,
                        "Week_Day": weekDay,
                        "Date_Time": datetimeObject,
                        "Activity_Type": timeslotActivity,
                        "Building": buildingName,
                        "Building_Obj_id": buildingObjectID,
                        "Classroom": classroomName,
                        "Classroom_Obj_id": classroomObjectID,
                        "Address": activityAddress,
                        "loc": [classroomLng, classroomLat]
                    }
                    UBCActivityList.append(dictionaryObject)
    print("\nActivity collection is done")

    print("Now uploading to mongo db")
    activitiesCollection = db.Activities

    # Adding the location and building name, classroom name, start time and date time indices
    activitiesCollection.drop_indexes()
    activitiesCollection.ensure_index( [("loc", pymongo.GEO2D) ] )
    activitiesCollection.ensure_index( [{"Classroom": 1}])
    activitiesCollection.ensure_index( [{"Building": 1}])
    activitiesCollection.ensure_index( [{"Start_Time": 1}])
    activitiesCollection.ensure_index( [{"Date_Time": 1}])

    # # Finally we enter elements into the database on by one
    # # TODO: Remember to add indexing
    activitiesCollection.insert_many(UBCActivityList)

    print("Flooding the Activities collection complete.")
    return


run()