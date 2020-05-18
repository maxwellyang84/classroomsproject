from bs4 import BeautifulSoup
from itertools import product
import os
import json

# For this functionality, we onlt need to link ot one of the generated html files
# We are gathering the data from classrooms so any of hte data pointing to either date works

def run():
    """[Retrieves class info from one of the files in this folder
        Saves all in a json file.]
    """
    print("Starting classroom info gathering ...")

    # First we find all the files
    folderPath = "/home/vala/Documents/MaxwelProject/page_request/DaysTablesFireFox/"
    htmlFilesList = []
    for file in os.listdir(folderPath):
        if file.endswith(".html"):
            htmlFilesList.append(file)
    
    # We choose to work with the first file (any other file should be fine)
    fileName = htmlFilesList[0]
    htmlPath = folderPath + fileName

    # Creating the bs4 soup object
    with open(htmlPath, 'r') as f:
        webpage = f.read()
    soup = BeautifulSoup(webpage, features="lxml")

    # Finding a list of all the headers
    headersList = soup.findAll("table", {"class": "header-border-args"})
    numberOfClassrooms = len(headersList)

    print("We have found overall " + str(len(headersList)) + " classrooms.")

    # We create the dictionary and we save it 
    classInfoDictionary = {}
    for classIndex in range(0,numberOfClassrooms):
        classroomName = headersList[classIndex].findAll("span", {"class": "header-0-1-1"})[0].text
        buildingName = classroomName.split(" ")[0]
        classroomCapacity = int(headersList[classIndex].findAll("span", {"class": "header-2-0-1"})[0].text)
        classroomSpecs = headersList[classIndex].findAll("span", {"class": "header-3-0-0"})[0].text
        classInfoDictionary[classroomName] = { "classroomName":classroomName , 
                                            "buildingName":buildingName, 
                                            "classroomCapacity": classroomCapacity,
                                            "classroomSpecs": classroomSpecs}

    # Saving to a json file
    with open('/home/vala/Documents/MaxwelProject/page_request/json_data/classroom_info.json', 'w') as jsonFile:
        json.dump(classInfoDictionary, jsonFile)

    print("Classroom info gathering complete!")


run()