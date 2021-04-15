import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Form } from "react-bootstrap";
import firebase from "../firebase";
import UserJobs from "../UserJobs";
import getUser from "../Auth";
import "../App.css";

//form modal
function MyModal(props) {
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, cname, url, location } = e.target.elements;

    let randomId = Math.random().toString(36).substr(2, 5); //generate id for doc
    const db = firebase.firestore();
    db.collection(`users/${getUser().uid}/jobs`)
      .doc(randomId)
      .set({
        title: title.value,
        company: cname.value,
        company_url: url.value,
        location: location.value,
        id: randomId,
        status: "Applying",
        date: new Date().toLocaleDateString(),
      })
      .then(function () {
        window.location.reload(false); //reloads page to update new jobs
      })
      .catch(function (error) {
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
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              name="cname"
              required={true}
              placeholder="Enter Company name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              name="title"
              required={true}
              placeholder="Enter Job title"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              required={true}
              placeholder="Enter job location"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Company url</Form.Label>
            <Form.Control
              name="url"
              required={true}
              placeholder="Enter Company url"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

//page for user job list
export default function MyJobList() {
  const [modalShow, setModalShow] = useState(false); //modal state
  const [jobs, setJobs] = useState([]); //job state
  useEffect(() => {
    //grabs users job list from firebase
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection(`users/${getUser().uid}/jobs`).get(); //users collection -> user id -> jobs collection -> job data docs
      setJobs(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  //sort jobs by date
  const sortedJobs = jobs.sort(function compare(a, b) {
    var time_a = Date.parse(
      a.date
        .replace(/-/g, "/")
        .replace("T", " ")
        .replace(/\..*|\+.*/, "")
    );
    var time_b = Date.parse(
      b.date
        .replace(/-/g, "/")
        .replace("T", " ")
        .replace(/\..*|\+.*/, "")
    );
    return time_b - time_a;
  });

  return (
    <Container className="my-4">
      <div>
        <div className="d-flex justify-content-between">
          <h1>My Jobs</h1>
          <div>
            <Button
              className="d-md-block"
              onClick={() => firebase.auth().signOut()} //sign out user
            >
              Sign out
            </Button>
          </div>
        </div>

        <Button href="/jobslist" className="mb-4">
          Jobs list
        </Button>

        <Button
          className="mb-4 addbtn"
          variant="outline-success"
          onClick={() => setModalShow(true)} //open new job form
        >
          Add new Job
        </Button>

        <MyModal show={modalShow} onHide={() => setModalShow(false)} />

        <ul>
          {sortedJobs.map((job) => {
            return <UserJobs key={job.id} job={job} />;
          })}
        </ul>
      </div>
    </Container>
  );
}
