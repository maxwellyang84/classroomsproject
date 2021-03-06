import React, {useState} from "react"
import BuildingList from './BuildingList';

import Scroll from './Scroll';
import SearchTableForm from './SearchTableForm';
import Navbar from '../common/Navbar';
import './SearchTable.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {Link, useRouteMatch} from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import {SingleDatePicker} from 'react-dates';


const buildingPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Buildings</Popover.Title>
      <Popover.Content>
        <BuildingList/>
      </Popover.Content>
    </Popover>
  );


  
  
function SearchTable(props){
    const [date, setDate] = useState(null)
    const [startTime, setStartTime] = useState('2:19')
    const [endTime, setEndTime] = useState('2:10')
    const [focused, setFocused] = useState(true)
    
   

    return(
        <>
        {/* <div className="search-table">
            <Navbar name={"Search"}/>
            <h3 style={{textAlign: 'center', fontSize: "16px", textDecoration: "underline"}}>BUILDINGS</h3>
            <Scroll>
                <BuildingList/>
            </Scroll>
            <SearchTableForm 
                date={date} 
                startTime={startTime} 
                endTime={endTime} 
                setDate={setDate} 
                setStartTime={setStartTime} 
                setEndTime={setEndTime}
                handleSubmit={handleSubmit}
            />
        </div> */}
          
                
        <div className="search-form">
                
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={buildingPopover}
            >
                  <div className="building-section">
                    <p className="building-header">Buildings</p>
                    <p className="building-subheader">Select Buildings to Include</p>
                    <div className="line-1"/>
                </div>
              
            </OverlayTrigger>

             
         
                <div className="date-section" id="date-container">
                <p className="date-header">Date</p>
                <div className="date">
                    <SingleDatePicker
                        date={date} // momentPropTypes.momentObj or null
                        onDateChange={date => {
                            console.log(date)
                            setDate(date)}} // PropTypes.func.isRequired
                        focused={focused} // PropTypes.bool
                        onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
                        id="your_unique_id" // PropTypes.string.isRequired,
                        placeholder=""
                        noBorder={true}
                        customInputIcon={
                            <p className="date-header">Date</p>
                        }
                        numberOfMonths={1}
                    />
                </div>
               
                
                <div className="line-2"/>
                </div>
           
            
            <div className="starttime-section">
                <p className="starttime-header">Start Time</p>
                <Form.Control type="time" className="starttime"/>
                <div className="line-3"/>
            </div>
            <div className="endtime-section">
                <p className="endtime-header">End Time</p>
                <Form.Control type="time" className="endtime"/>
            </div>
            
            <Button variant="primary" type="submit" onClick={()=>props.setSearch(true)}>Submit</Button>
        </div>
        </>
    )
}

const handleSubmit = (e, date, startTime, endTime)=>{
    e.preventDefault()

    console.log(date)
    console.log(startTime)
    console.log(endTime)
    console.log("Submitted");
}


export default SearchTable