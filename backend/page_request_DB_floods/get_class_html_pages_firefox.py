import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import ui



sleep_time = 2

# setting the url to Scientia Ltd 2.0.43
# input("Press enter to start")
# chromPath = r"/home/vala/Documents/MaxwelProject/page_request/chromedriver"
# driver = webdriver.Chrome(chromPath)
driver = webdriver.Firefox()

# input("Press enter to go to the timetable page ...")
url = "https://sws.students.ubc.ca/van_2019/default.aspx"
driver.get(url)
time.sleep(30)

# input("Got the UBC online timetable page, press enter to click on the rooms link ...")
driver.find_element_by_id("LinkBtn_locationByZone").click()
time.sleep(30)

# input("Got the UBC online timetable rooms page, press enter to choose all the rooms in the options ...")
selectRoom = driver.find_element_by_class_name("DepartmentFilter")
for option in selectRoom.find_elements_by_tag_name('option'):
    option.click()
time.sleep(10)

# Deselecting the all weeks option
selectWeek = driver.find_elements_by_id("lbWeeks")
selectWeekOptions = selectWeek[0].find_elements_by_tag_name('option')
selectWeekOptions[0].click()

# Looping through the weeks
week_index = 21
while week_index < 53 + 3:

    print("Week------------------>" + str(week_index))
    # input("Chose all the rooms in the options, press enter to find to choose the week ...")
    selectWeek = driver.find_elements_by_id("lbWeeks")
    selectWeekOptions = selectWeek[0].find_elements_by_tag_name('option')
    selectWeekOptions[week_index].click()
    weekName = selectWeekOptions[week_index].text

    # Looping through the days
    day_index = 2
    while day_index < 7 + 2:

        print("Sleeping the process for " + str(sleep_time) + " seconds.")
        time.sleep(sleep_time)
        
        print("Day--------------------------------------->" + str(day_index))
        print("Entering day index " + str(day_index))

        # input("Chose the week, press enter to find the day of the week ...")
        selectDay = driver.find_elements_by_id("lbDays")
        selectDay[0].find_elements_by_tag_name('option')[day_index].click()
        dayName = selectDay[0].find_elements_by_tag_name('option')[day_index].text

        # input("Chose the day of the week, press enter to find the time of day ...")
        selectTime = driver.find_elements_by_id("dlPeriod")
        selectTime[0].find_elements_by_tag_name('option')[3].click()

        # Saving the main page
        window_main = driver.window_handles[0]

        # input("Chose the time of day, press enter to move on to the table page ...")
        selectViewTimeTable = driver.find_element_by_id("bGetTimetable")
        selectViewTimeTable.click()
        time.sleep(60)

        # Getting the table page
        window_table = driver.window_handles[1]
        driver.switch_to_window(window_table)

        # input("Saving the page ...")
        fileName = "DaysTablesFireFox/" + weekName.replace('/', '_') + "_" + dayName + ".html"
        with open(fileName, "w") as f:
            f.write(driver.page_source)
        f.close()

        # input("Closing the table page ...")
        driver.close()
        time.sleep(3)

        # input("Switching back to the main page ...")
        driver.switch_to_window(window_main)

        # Deselecting the day option
        selectDay = driver.find_elements_by_id("lbDays")
        selectDay[0].find_elements_by_tag_name('option')[day_index].click()
        print("Exiting day index " + str(day_index))
        
        day_index += 1
    
    time.sleep(3)
    # Deselecting the week option
    selectWeek = driver.find_elements_by_id("lbWeeks")
    selectWeekOptions = selectWeek[0].find_elements_by_tag_name('option')
    selectWeekOptions[week_index].click()
    print("Exiting week index " + str(week_index))
    
    week_index += 1

print("done!")