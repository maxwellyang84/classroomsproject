from pymongo import MongoClient

UBCBuildingsListFileName = '/home/vala/Documents/MaxwelProject/page_request/json_data/UBC_Building_List.json'
with open(UBCBuildingsListFileName, "r") as f:
    UBCBuildingsList = f.readlines()

client = MongoClient("mongodb+srv://dbVala:Aa123456@cluster0-dcbd6.mongodb.net/test?retryWrites=true&w=majority")
db = client.get_database("UBCBuildings")
buildings = db.Buildings
# print(str(UBCBuildingsList))
dummyClass = {
    "Complete_Name": "Earth Sciences Building", 
    "Abbrev_Name": "ESB", 
    "Address": "2207 Main Mall\n, Vancouver, BC, Vancouver, BC", 
    "Lat": 49.2701102, 
    "Lng": -123.2533532
             }

# buildings.no.ensureIndex({"Abbrev_Name":1})
# listOfBuildings = []
print(UBCBuildingsList[0])
for dictBuilding in UBCBuildingsList:
    dictBuilding = dict(dictBuilding)
    print((dictBuilding))
    buildings.insert_one(dictBuilding)
# buildings.insert_one(dummyClass)