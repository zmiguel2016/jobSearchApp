import React, {Component} from 'react'
import moment from 'moment'
import { Card, Badge, Button, Collapse, Form, Col } from 'react-bootstrap'
import ReactMarkdown from 'react'
import firebase from './firebase'
import {SingleDatePicker} from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

export default function UserJobs({job}) {


   const handleChange = (val) => changeStatus(val)
    function changeStatus(val){
        const db = firebase.firestore()
        db.collection("jobs").doc(job.id).update({
            status: val.target.value
        })
        .then(function() {
            console.log("Document successfully written!");
            window.location.reload(false);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

      
        //console.log(val.target.value)
    }
    return(
        <Card className = "mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                        {job.title} - <span className="text-muted 
                         font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Badge variant= "secondary">{job.location}</Badge>
                        <Card.Text>
                            {job.company_url}
                        </Card.Text>
                    </div>
                </div>
                <div>
            <Form>
                <Form.Group controlId="statusid">
                <Form.Row>   
                <Col xs="auto" className="my-1">
                    <Form.Label>Status: {job.status}</Form.Label>
                    <Form.Control  as="select" defaultValue="Update Status" onChange= {handleChange}>
                    <option>Update Status</option>  
                    <option>Applying</option>  
                    <option>Application Sent</option>
                    <option>Interview</option>
                    <option>Coding test</option>
                    <option>Final Interview</option>
                    <option>Offer</option>
                    </Form.Control>
                    </Col>
                    </Form.Row> 
                </Form.Group>
                
            </Form>
                </div>
    
            </Card.Body>
        </Card>
           
    )
}