import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Modal, Form } from 'react-bootstrap'
import firebase from '../firebase'
import UserJobs from '../UserJobs'
import getUser from "../Auth"
import '../App.css'

function MyModal(props) {
    const initialFormData = Object.freeze({
        cname: "",
        location: "",
        title: "",
        url: "",
      });

    const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let randomId = Math.random().toString(36).substr(2, 5);
    console.log(formData);
    const db = firebase.firestore()
    db.collection(`users/${getUser().uid}/jobs`).doc(randomId).set({
            title: formData.title,
            company: formData.cname,
            company_url: formData.url,
            location: formData.location,
            //apply: "",
            id: randomId,
            status: " ",
            date: " "
    })
    .then(function() {
        console.log("Document successfully written!");
        window.location.reload(false);
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    }); 
  };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Job Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          
        <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control onChange={handleChange} name="cname" placeholder="Enter Company name" />
        </Form.Group>

        <Form.Group>
            <Form.Label>Job Title</Form.Label>
            <Form.Control onChange={handleChange} name="title" placeholder="Enter Job title" />
        </Form.Group>

        <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control onChange={handleChange} name="location" placeholder="Enter job location" />
        </Form.Group>

        <Form.Group>
            <Form.Label>Company url</Form.Label>
            <Form.Control onChange={handleChange} name="url" placeholder="Enter Company url" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}
        >
            Submit
        </Button>
        
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  function formSubmit(event){
      console.log(event.value.data)
  }

export default function MyJobList(){
    const [modalShow, setModalShow] = React.useState(false);

    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection(`users/${getUser().uid}/jobs`).get()
            setJobs(data.docs.map(doc => doc.data()))
        }
        fetchData()
    },[])
    
    return(
        <Container className="my-4">
        <div>
            <div className="d-flex justify-content-between">
            <h1>My Jobs</h1>
            <div >
            
            <Button  className ="d-md-block"  onClick={() => firebase.auth().signOut()}>Sign out</Button>
            </div>
            </div>
        
            <Button href="/jobslist" className="mb-4">Jobs list</Button>
            

            <Button className="mb-4" variant="primary" onClick={() => setModalShow(true)}>Add new Job</Button>

            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}/>


            
            <ul>
            {jobs.map(job => {
               return <UserJobs key={job.id} job={job}/>
            })}
        </ul>
        </div>
        
       
        </Container>
    )
}