import React, {useState, forwardRef} from 'react'
import { Card, Badge, Form, Col, Button } from 'react-bootstrap'
import firebase from './firebase'
import DatePicker from "react-datepicker"
import ReactMarkdown from 'react-markdown'
import "react-datepicker/dist/react-datepicker.css";



export default function UserJobs({job}) {

    const [startDate, setStartDate] = useState(null)
    const CustomInput = forwardRef(({value, onClick},ref) => (
        <Button variant="outline-dark" ref={ref }onClick={onClick}>Update Date
          {value}
        </Button>
      ));
      
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
    }

   function changeDate(val) {
   // const dateF = moment(val).format('DD MMM YYYY')
   const dateF = new Date(val).toLocaleDateString()
    const db = firebase.firestore()
    db.collection("jobs").doc(job.id).update({
        date: dateF
    })
    .then(function() {
        console.log("Document successfully written!");
        window.location.reload(false);
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    }); 
    
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
                            <ReactMarkdown source = {job.company_url}/>
                           <ReactMarkdown source ={job.apply}/>
                        </Card.Text>
                    </div>
                </div>

        <div>
            <Form>
                <Form.Group controlId="statusid">
                <Form.Row>   
                <Col xs="auto" className="my-1">
                    <Form.Label>Status: {job.status}</Form.Label>
                    <Form.Control as="select" defaultValue="Update Status" onChange= {handleChange}>
                    <option>Update Status</option>  
                    <option>Applying</option>  
                    <option>Application Sent</option>
                    <option>Interview</option>
                    <option>Coding test</option>
                    <option>Final Interview</option>
                    <option>Offer</option>
                    </Form.Control>
                    </Col>
                    <Col xs="auto" className="my-1">
                    <Form.Label>Date: {job.date} </Form.Label>
                    <div>
                    <DatePicker
                        selected={startDate}
                        placeholderText='mm/dd/yyyy'
                        dateFormat="MM/dd/yyyy"
                        onChange={date => changeDate(date)}
                        customInput={<CustomInput />}
                        withPortal
                        />
                        </div>
                    </Col>
                    </Form.Row> 
                </Form.Group>
            </Form>
        </div>
                
            </Card.Body>
        </Card>
           
    )
}