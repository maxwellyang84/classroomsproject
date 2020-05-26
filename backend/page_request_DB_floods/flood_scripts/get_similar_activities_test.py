import json
import sys
from tqdm import tqdm
from tqdm import tqdm_gui
from datetime import datetime
import pymongo
databaseName = "UBC_ClassroomFinder_DataBase_V3"
weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


classroomScheduleJsonFileName = "/home/vala/Documents/MaxwelProject/page_request/json_data/classroom_schedule.json"

with open(classroomScheduleJsonFileName) as f:
    dictionaryScheduleJson = json.load(f)

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

UBCActivityList = []
# Here we will only enter one month


set_of_activities = set()
number_of_activities = 0
number_of_empties = 0

for date in listOfKeys:
    thisDayClasses = dictionaryScheduleJson[date]

    for classroomName in thisDayClasses.keys():
        classroomSchedule = thisDayClasses[classroomName]

        for timeslot in classroomSchedule.keys():
            timeslotActivity = classroomSchedule[timeslot]

            number_of_activities += 1
            set_of_activities.add(timeslotActivity)
            if timeslotActivity == "Empty":
                number_of_empties += 1


print(number_of_activities)
print(len(list(set_of_activities)))
print(number_of_empties)


