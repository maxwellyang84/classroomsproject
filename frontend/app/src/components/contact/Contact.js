import React, {useState} from "react"
import './Contact.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';


function Contact(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("")
    return(
        <div className="contact">
            <h1 className="contact-header">Contact</h1>
            <Form className="form" >
                <Form.Row>
                    <center><Form.Label className="label">Name</Form.Label></center>
                    <Form.Control type="input" value={name} onChange={(e)=> setName(e.target.value)}/>
                </Form.Row>
                <Form.Row>
                        <center><Form.Label className="label">Email</Form.Label></center>
                        <Form.Control type="input" value={email} onChange= {(e)=> setEmail(e.target.value)}/>
                </Form.Row>
                <Form.Row>
                        <center><Form.Label className="label">Description</Form.Label></center>
                        <InputGroup size="lg">
                            <Form.Control  componentClass="textarea" type="input" value={description} onChange= {(e)=> setDescription(e.target.value)} style={{height: '200px'}} />
                        </InputGroup>
                        
                </Form.Row>
                
                    <Button variant="primary" type="submit"> Submit </Button>
             
            </Form>  
        </div>
    )
}

export default Contact;