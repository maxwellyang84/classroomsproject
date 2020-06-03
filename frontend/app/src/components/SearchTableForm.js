import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function SearchTableForm(props){
    return(
        <>
        <Form onSubmit={(e) => props.handleSubmit(e,props.date,props.startTime,props.endTime)}>
        <Form.Row>
            <Form.Group as={Col}>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" value={props.date} onChange={(e)=> props.setDate(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="time" value={props.startTime} onChange= {(e)=> props.setStartTime(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>End Time</Form.Label>
                <Form.Control type="time" value={props.endTime} onChange= {(e)=> props.setEndTime(e.target.value)} min={props.startTime}/>
            </Form.Group>
        </Form.Row>
        </Form>               
        <Button variant="primary" type="submit"> Submit </Button>
        </>
    )
  
    }

export default SearchTableForm;