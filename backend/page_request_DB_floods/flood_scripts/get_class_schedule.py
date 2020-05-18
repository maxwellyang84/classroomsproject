from bs4 import BeautifulSoup
from itertools import product
from datetime import date, timedelta
import os
import json

# This code creates the relevany json dictionary files.
# For each date (which is represented by each of the html files in this folder)
# we have a key (the date) . For each of those dates, we have a dictionray
# representing a key/value relation for each time slot,
# Each key is a timeslot which has a value saying if the clasroom is empty during
# that timeslot or if there is another activity in the classroom during that time. 



def get_date_dictionary(folderPath, fileName):
    """[A function that gets the date dictionary for the classrooms and 
        returns it in a single dictionary.]

    Arguments:
        htmlPath {[String]} -- [Name of the html file]

    Returns:
        [Dict] -- [Returns a dictionary of dictionaries.
                Key value is of the form:
                { classroom name : classroom schedule }

                classroom schedule is of the form: 
                { time slot from 7am-10pm : activity type (Empty, Lec, Lab, ...) } ]
    """
    # Getting the full path
    htmlPath = folderPath + fileName

    # Creating the bs4 soup object
    with open(htmlPath, 'r') as f:
        webpage = f.read()
    soup = BeautifulSoup(webpage, features="lxml")

    # Returned dictionary
    thisDateDictionary = {}

    # A list of headers and tables for each classroom
    tablesList = soup.findAll("table", {"class": "grid-border-args"})
    headersList = soup.findAll("table", {"class": "header-border-args"})
    numberOfClassrooms = len(headersList)

    # Iterating through the classrooms
    for classIndex in range(0,numberOfClassrooms):

        classroomName = headersList[classIndex].findAll("span", {"class": "header-0-1-1"})[0].text

        # Making the slotted table
        # As for any other html parsin, there were edge cases that were handled
        # In this step we create a list
        thisClassroomSchedule = []
        for row in tablesList[classIndex].find_all("tr"):
            thisTimeSlot = []
            ourRow = row.find_all("td", {"class": "row-label-one"})
            
            if len(ourRow) != 0:

                thisTimeSlot.append(ourRow[0].text)
                classActivity = row.find_all("td", {"colspan": "1"})
                
                if len(classActivity) != 0:
                    thisTimeSlot.append(int(classActivity[0]["rowspan"]))
                    thisTimeSlot.append(classActivity[0].text.replace("\n", " "))
            
                thisClassroomSchedule.append(thisTimeSlot)

        # In this step we turn the list into a dictionary
        thisClassroomScheduleDictionary = {}
        slotStack = []
        for timeslot in thisClassroomSchedule:
            if len(timeslot) > 1:
                for i in range(0,timeslot[1]):
                    slotStack.append(timeslot[2])
            if len(slotStack) != 0:
                thisClassroomScheduleDictionary[timeslot[0]] = slotStack.pop(0)
            else:
                thisClassroomScheduleDictionary[timeslot[0]] = "Empty"

        # Appending the dictionaries as value of the classroom name
        thisDateDictionary[classroomName] = thisClassroomScheduleDictionary
    
    return thisDateDictionary




weekDictionary = {"Mon":0, "Tue":1, "Wed":2, "Thu":3, "Fri":4, "Sat":5, "Sun":6}
def get_date(folderPath, fileName):
    """[A function that gets the date for each table]

    Arguments:
        startDate {[list]} -- [A list of integers in the form of [year,month,day] ]
        dayOfWeek {[String]} -- [Abbreviated string for the day of the week]

    Returns:
        [String] -- [A date string n the form of year-month-day]
    """

    # Getting the full path
    htmlPath = folderPath + fileName

    with open(htmlPath, 'r') as f:
        webpage = f.read()

    soup = BeautifulSoup(webpage, features="lxml")

    # We only need on of the headers
    headersList = soup.findAll("table", {"class": "header-border-args"})

    # This is the process for finding the date given start of the week date and day of the week
    startDate = headersList[0].findAll("span", {"class": "header-1-2-3"})[0].text
    dayOfWeek = fileName.split(" ")[5].split("_")[1].split(".")[0]
    startDate = [2000 + int(startDate.split("/")[2]), int(startDate.split("/")[0]), int(startDate.split("/")[1])]
    
    sdate = date(startDate[0], startDate[1], startDate[2])
    indexOfWeekDay = weekDictionary[dayOfWeek]
    thisDate = sdate + timedelta(days=indexOfWeekDay)

    return str(thisDate)


def run():
    """[Retrieves class info from one of the files in this folder
        Saves all in a json file.]
    """

    print("Starting classroom schedule gathering ... ")

    # First we find all the files
    folderPath = "/home/vala/Documents/MaxwelProject/page_request/DaysTablesFireFox/"

    htmlFilesList = []
    for file in os.listdir(folderPath):
        if file.endswith(".html"):
            htmlFilesList.append(file)

    print("We have found " + str(len(htmlFilesList)) + " html files corresponding to dates.")


    yearRoundDictionary = {}

    for fileName in htmlFilesList:

        # Getting the dictionary for each date
        thisDateDictionary = get_date_dictionary(folderPath, fileName)  

        # Getting the date label
        thisDate = get_date(folderPath, fileName)  

        # Adding to the main year-round dictionary
        yearRoundDictionary[thisDate] = thisDateDictionary

    # Saving to a json file
    with open('/home/vala/Documents/MaxwelProject/page_request/json_data/classroom_schedule.json', 'w') as jsonFile:
        json.dump(yearRoundDictionary, jsonFile)
    
    print("Classroom schedule gathering complete!")



run()


