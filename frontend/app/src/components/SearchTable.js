import React, {useState} from "react"
import BuildingList from './BuildingList';

import Scroll from './Scroll';
import SearchTableForm from './SearchTableForm';
import Navbar from './Navbar';
import './SearchTable.css'
import Button from 'react-bootstrap/Button';

function SearchTable(){
    const [date, setDate] = useState('1999-10-01')
    const [startTime, setStartTime] = useState('2:19')
    const [endTime, setEndTime] = useState('2:10')
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
            <p className="building-header">Buildings</p>
            <p className="building-subheader">Select Buildings to Include</p>
            <div className="line-1"/>
            <p className="date-header">Date</p>
            
            <div className="line-2"/>
            <p className="starttime-header">Start Time</p>
            <div className="line-3"/>
            <p className="endtime-header">End Time</p>
            <Button variant="primary" type="submit">Submit</Button>
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