import React, {useState} from "react"
import BuildingList from './BuildingList';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Scroll from './Scroll';

function SearchTable(){
    const [date, setDate] = useState('1999-10-01')
    const [startTime, setStartTime] = useState('2:19')
    const [endTime, setEndTime] = useState('2:10')
    return(
        <>
            <Scroll>
                <BuildingList/>
            </Scroll>
                <Form onSubmit={(e) => handleSubmit(e,date,startTime,endTime)}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" value={date} onChnage={(e)=> setDate(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control type="time" value={startTime} onChange= {(e)=> setStartTime(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control type="time" value={endTime} onChange= {(e)=> setEndTime(e.target.value)} min={startTime}/>
                        </Form.Group>
                    </Form.Row>
                </Form>               
                <Button variant="primary" type="submit"> Submit </Button>
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