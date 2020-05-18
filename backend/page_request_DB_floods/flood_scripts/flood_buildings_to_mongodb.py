# This program creates the buildings collection using the classroom info json file
# and the UBCClassroomAddresses text file
import json
from googlemaps import Client as GoogleMaps
import pymongo
databaseName = "UBC_ClassroomFinder_DataBase_V5"

def run():
    """[Function for creating the buildings collection in the UBC_ClassroomFinder_DataBase database]
    """
    print("Started flooding the Buildings collection ...")
    
    classroomInfoJsonFileName = "/home/vala/Documents/MaxwelProject/page_request/json_data/classroom_info.json"
    UBCClassroomAddressesFileName = "/home/vala/Documents/MaxwelProject/page_request/DaysTablesChromeV2/UBCClassroomAddresses.txt"
    googleMapAPI = 'AIzaSyBtnmS2qOuXie7iXgZJoUhUgbBzNFcik-A'


    with open(classroomInfoJsonFileName) as f:
        classroomInfoDictionary = json.load(f)

    with open(UBCClassroomAddressesFileName, "r") as f:
        addressLines = f.readlines()

    # We make a dictionary with the key value of :
    # abbrev_name: [complete_name, address]
    # this text document was partially manually created
    UBCBuildingAddressDictionary = {}
    for line in addressLines:
        UBCBuildingAddressDictionary[ line.split(",")[1] ] = [line.split(",")[0], line.split(",")[2] + ", Vancouver, BC"]

    # We also get all the building for which we have extracted 
    # classroom information from the schedule website
    buildingList = set()
    for classroomName in classroomInfoDictionary.keys():
        buildingName = classroomName.split(" ")[0].strip()
        buildingList.add(buildingName)

    # We use google API's to find the longitude lattitude
    gmaps = GoogleMaps(googleMapAPI)

    # Now we create the buildings list
    UBCBuildingList = []
    for buildingAbbrevname in buildingList:
        fullName = UBCBuildingAddressDictionary[buildingAbbrevname][0]
        abbrevName = buildingAbbrevname
        address = UBCBuildingAddressDictionary[buildingAbbrevname][1] + ", Vancouver, BC"
        geocode_result = gmaps.geocode(address)
        buildingLng = geocode_result[0]['geometry']['location']['lng']
        buildingLat = geocode_result[0]['geometry']['location']['lat']
        buildingDictionary = {
            "Complete_Name":fullName,
            "Abbrev_Name": abbrevName,
            "Address":address,
            "Loc": {
                        "type": "Point",
                        "coordinates":[float(buildingLng), float(buildingLat)]
                   }
        }
        UBCBuildingList.append(buildingDictionary)

    # Now we connect to the databse and fill the mongo db database
    # User and password go here
    client = pymongo.MongoClient("mongodb+srv://dbVala:Aa123456@cluster0-dcbd6.mongodb.net/test?retryWrites=true&w=majority")
    db = client.get_database(databaseName)
    buildingsCollection = db.Buildings

    # Adding the location and building name as indices
    buildingsCollection.drop_indexes()
    buildingsCollection.ensure_index( [("Loc", pymongo.GEOSPHERE) ] )
    buildingsCollection.ensure_index( [("Complete_Name", pymongo.ASCENDING)] )
    

    # Finally we enter elements into the database on by one
    # TODO: Remember to add indexing
    for dictBuilding in UBCBuildingList:
        buildingsCollection.insert_one(dictBuilding)
    

    print("Flooding the Buildings collection complete.")
    return


run()