# import json
# from googlemaps import Client as GoogleMaps

# classroomScheduleJsonFileName = "/home/vala/Documents/MaxwelProject/page_request/json_data/classroom_schedule.json"
# classroomInfoJsonFileName = "/home/vala/Documents/MaxwelProject/page_request/json_data/classroom_info.json"
# UBCClassroomFileName = "/home/vala/Documents/MaxwelProject/page_request/DaysTablesChromeV2/UBCClassroomAddresses.txt"
# googleMapAPI = 'AIzaSyBtnmS2qOuXie7iXgZJoUhUgbBzNFcik-A'

# with open(classroomScheduleJsonFileName) as f:
#     dictionaryScheduleJson = json.load(f)

# with open(classroomInfoJsonFileName) as f:
#     dictionaryInfoJson = json.load(f)

# with open(UBCClassroomFileName, "r") as f:
#     addressLines = f.readlines()

# gmaps = GoogleMaps(googleMapAPI)

# activityList = []
# classroomList = set()
# buildingList = set()

# for day in dictionaryScheduleJson.keys():
#     thisDayClasses = dictionaryScheduleJson[day]

#     for classroom in thisDayClasses.keys():
#         classroomList.add(classroom)
#         buildingList.add(classroom.split(" ")[0])
#         classroomSchedule = thisDayClasses[classroom]

#         for timeslotIndex in range(len(classroomSchedule.keys())):
#             timeslot = list(classroomSchedule.keys())[timeslotIndex]
#             timeslotActivity = classroomSchedule[timeslot]

#             if timeslotActivity != "Empty":
#                 dictionaryObject = {
#                     "Building": classroom.split(" ")[0],
#                     "Start_Time": timeslot,
#                     "Classroom": classroom,
#                     "Date": day
#                 }
#                 activityList.append(dictionaryObject)
# buildingList = list(buildingList)
# classroomList = list(classroomList)


# UBCBuildingDictionary = {}
# for line in addressLines:
#     UBCBuildingDictionary[ line.split(",")[1] ] = [line.split(",")[0], line.split(",")[2] + ", Vancouver, BC"]


# UBCBuildingList = []
# for buildingAbbrevname in buildingList:
#     fullName = UBCBuildingDictionary[buildingAbbrevname][0]
#     abbrevName = buildingAbbrevname
#     address = UBCBuildingDictionary[buildingAbbrevname][1] + ", Vancouver, BC"
#     geocode_result = gmaps.geocode("1822 East Mall, Vancouver, BC")
#     lat = geocode_result[0]['geometry']['location']['lat']
#     lng = geocode_result[0]['geometry']['location']['lng']
#     buildingDictionary = {
#         "Complete_Name":fullName,
#         "Abbrev_Name": abbrevName,
#         "Address":address,
#         "Lat": lat,
#         "Lng":lng
#     }
#     UBCBuildingList.append(buildingDictionary)


# UBCClassroomList = []
# for classroomName in classroomList:
#     name = classroomName
#     building = classroomName.split(" ")[0]
#     address = UBCBuildingDictionary[building][1] + ", Vancouver, BC"
#     geocode_result = gmaps.geocode("1822 East Mall, Vancouver, BC")
#     lat = geocode_result[0]['geometry']['location']['lat']
#     lng = geocode_result[0]['geometry']['location']['lng']
#     classroomDictionary = {
#         "Name":name,
#         "Building": building,
#         "Address":address,
#         "Lat": lat,
#         "Lng":lng
#     }
#     UBCClassroomList.append(classroomDictionary)


# # Saving to a json file
# with open('/home/vala/Documents/MaxwelProject/page_request/json_data/UBC_Classroom_List.json', 'w') as jsonFile:
#     json.dump(classroomDictionary, jsonFile)

# # Saving to a json file
# with open('/home/vala/Documents/MaxwelProject/page_request/json_data/UBC_Building_List.json', 'w') as jsonFile:
#     json.dump(UBCBuildingList, jsonFile)

# # Saving to a json file
# with open('/home/vala/Documents/MaxwelProject/page_request/json_data/UBC_Activity_List.json', 'w') as jsonFile:
#     json.dump(activityList, jsonFile)






from pymongo import MongoClient

UBCBuildingsListFileName = '/home/vala/Documents/MaxwelProject/page_request/json_data/UBC_Building_List.json'
with open(UBCBuildingsListFileName, "r") as f:
    UBCBuildingsList = f.readlines()

client = MongoClient("mongodb+srv://dbVala:Aa123456@cluster0-dcbd6.mongodb.net/test?retryWrites=true&w=majority")
db = client.get_database("UBCBuildings")
buildings = db.Buildings

# for dictBuilding in UBCBuildingList:
#     print(type(dictBuilding))
#     buildings.insert_one(dictBuilding)
# print(buildings.count_document({}))


myquery = { "Abbrev_Name": "ESB" }

mydoc = buildings.find(myquery)

for x in mydoc:
    print(x)
    print("___________________")