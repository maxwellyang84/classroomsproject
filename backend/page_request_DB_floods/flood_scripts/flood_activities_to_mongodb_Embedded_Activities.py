import json
import sys
from tqdm import tqdm
from tqdm import tqdm_gui
from datetime import datetime
import pymongo
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
    activitiesCollection = db.Activities

    # Now we create the Activities list
    print("Gathering activity data")

    # These two dictionaries are cached to reduce the process time
    UBCBuildingDataDictionary = {}
    UBCClassroomDataDictionary = {}

    # Printing a list of dates
    input("Here are the list of dates we are entering:")
    listOfKeys = list(dictionaryScheduleJson.keys())
    listOfKeys.sort()
    listOfKeys = listOfKeys[30:60]
    print(listOfKeys)
    input("Perhaps copy this somewhere !")


    # Here we create the dictionary
    # activityDictionaryObjects = {}
    # for act in activitiesCollection.find():
    #     # activityKey = act["Classroom"] + "_" + act["Date_Time"]
    #     # activityValue = {
    #     #                     "Start_Time": act["Start_Time"],
    #     #                     "Date": act["Date"],
    #     #                     "Week_Day": act["Week_Day"],
    #     #                     "Date_Time": act[""],
    #     #                     "Activity_Type": timeslotActivity,
    #     #                     "Activity_ID": activitiesID
    #     #                 }
    #     print(act)
    #     input()

    # Here we will only enter one month
    for date in listOfKeys:
        thisDayClasses = dictionaryScheduleJson[date]
        thisDateClassroomsList = []

        # This is for printing
        sys.stdout.write("\r Number of dates found: %d" %len(thisDateClassroomsList))
        sys.stdout.flush()

        for classroomName in thisDayClasses.keys():
            classroomSchedule = thisDayClasses[classroomName]

            
            
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
            classroomLng = classroomData["Loc"]["coordinates"][0]
            classroomLat = classroomData["Loc"]["coordinates"][1]

            classroomActivities = []
            for timeslot in classroomSchedule.keys():
                timeslotActivity = classroomSchedule[timeslot]

                # Here we also create the datetime object
                datetimeString = date.split("-")[1] + "/" + date.split("-")[2] + "/" + date.split("-")[0][2:] + " " + timeslot + ":00"
                datetimeObject = datetime.strptime(datetimeString, '%m/%d/%y %H:%M:%S')
                weekDay =  weekDays[datetimeObject.weekday()]

                # We also retireve the activities data
                activitiesDataList = list( activitiesCollection.aggregate([ {"$match": { "$and": [ {"Classroom": "ALRD 105"}, {"Start_Time": "9:00"}, {"Date": "2019-09-18"} ]} }]) )
                activitiesQuery = { "Classroom": classroomName, "Start_Time":timeslot, "Date":date}
                input(activitiesDataList)
                print(activitiesQuery)
                # activitiesDataList = list(activitiesCollection.find(activitiesQuery))
                if len(activitiesDataList) != 1:
                    print("Error, for activities code " + str(activitiesQuery) + " we might have duplicate data or no data.")
                    print("Please conside checking the activities database for duplicates")
                # Get the first classroom as the targetted building data
                activitiesData = activitiesDataList[0]

                activitiesID = activitiesData["_id"]
                # We only consider timeslot that don't have an empty activity string
                # if timeslotActivity != "Empty":
                # We have removed this If operation to add empty activities
                activityDictionaryObject = {
                    "Start_Time": timeslot,
                    "Date": date,
                    "Week_Day": weekDay,
                    "Date_Time": datetimeObject,
                    "Activity_Type": timeslotActivity,
                    "Activity_ID": activitiesID
                }
                classroomActivities.append(activityDictionaryObject)
        

            # Here we also create the datetime object for the day only
            datetimeStringForDateOnly = date.split("-")[1] + "/" + date.split("-")[2] + "/" + date.split("-")[0][2:]
            datetimeObjectDateOnly = datetime.strptime(datetimeStringForDateOnly, '%m/%d/%y %H:%M:%S')
            
            dictionaryObject = {
                "Start_Time": timeslot,
                "Date": date,
                "Week_Day": weekDay,
                "Date_Time_Days_Only": datetimeObjectDateOnly,
                "Building": buildingName,
                "Building_Obj_id": buildingObjectID,
                "Classroom": classroomName,
                "Classroom_Obj_id": classroomObjectID,
                "Address": activityAddress,
                "Loc": {
                        "type": "Point",
                        "coordinates":[classroomLng, classroomLat]
                        },
                "Classroom_Activities": classroomActivities
            }
            thisDateClassroomsList.append(dictionaryObject)

        input("HERE")
        # Here we create a collection for this date
        ClassroomActivitiesEmbeddedDate = db.create_collection(date)

        # Adding the location and building name, classroom name, start time and date time indices
        ClassroomActivitiesEmbeddedDate.drop_indexes()
        ClassroomActivitiesEmbeddedDate.ensure_index( [("Loc", pymongo.GEOSPHERE) ] )
        ClassroomActivitiesEmbeddedDate.ensure_index( [("Classroom", pymongo.ASCENDING)] )
        ClassroomActivitiesEmbeddedDate.ensure_index( [("Building", pymongo.ASCENDING)] )

        # # Finally we enter elements into the database on by one
        # # TODO: Remember to add indexing
        ClassroomActivitiesEmbeddedDate.insert_many(thisDateClassroomsList)

    print("\nFlooding the Activities collection complete.")
    return


run()