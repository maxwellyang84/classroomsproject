import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './SearchTableForm.css';

function SearchTableForm(props){
    return(
        <>
        <Form className="form" onSubmit={(e) => props.handleSubmit(e,props.date,props.startTime,props.endTime)}>
        <Form.Row>
            <Form.Group as={Col}>
                <center><Form.Label className="label">Date</Form.Label></center>
                <Form.Control type="date" value={props.date} onChange={(e)=> props.setDate(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}>
                <center><Form.Label className="label">Start Time</Form.Label></center>
                <Form.Control type="time" value={props.startTime} onChange= {(e)=> props.setStartTime(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}>
                <center><Form.Label className="label">End Time</Form.Label></center>
                <Form.Control type="time" value={props.endTime} onChange= {(e)=> props.setEndTime(e.target.value)} min={props.startTime}/>
            </Form.Group>
        </Form.Row>
        <div className="text-center">
            <Button variant="primary" type="submit"> Submit </Button>
        </div>
        </Form>               
       
       
        </>
    )
  
    }

export default SearchTableForm;