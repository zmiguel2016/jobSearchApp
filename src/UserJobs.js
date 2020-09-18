import React, { useState, forwardRef } from "react";
import { Card, Badge, Form, Col, Button } from "react-bootstrap";
import firebase from "./firebase";
import DatePicker from "react-datepicker";
import ReactMarkdown from "react-markdown";
import "react-datepicker/dist/react-datepicker.css";
import getUser from "./Auth";

//cards for user jobs list
export default function UserJobs({ job }) {
  const [startDate, setStartDate] = useState(null);

  //custom date button
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button variant="outline-dark" ref={ref} onClick={onClick}>
      Update Date
      {value}
    </Button>
  ));

  //handle status change
  const handleChange = (val) => changeStatus(val);
  function changeStatus(val) {
    //update database with new status value
    const db = firebase.firestore();
    db.collection(`users/${getUser().uid}/jobs`)
      .doc(job.id)
      .update({
        status: val.target.value,
      })
      .then(function () {})
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  //handle date change update database with new date value
  function changeDate(val) {
    const dateF = new Date(val).toLocaleDateString();
    const db = firebase.firestore();
    db.collection(`users/${getUser().uid}/jobs`)
      .doc(job.id)
      .update({
        date: dateF,
      })
      .then(function () {
        console.log("Document successfully written!");
        window.location.reload(false);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  //deletes job from users list. Rejected :(
  function deleteJob() {
    const db = firebase.firestore();
    db.collection(`users/${getUser().uid}/jobs`)
      .doc(job.id)
      .delete()
      .then(function () {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span
                className="text-muted 
                         font-weight-light"
              >
                {job.company}
              </span>
            </Card.Title>
            <Badge variant="secondary">{job.location}</Badge>
            <div style={{ wordBreak: "break-all" }}>
              <ReactMarkdown source={job.company_url} />
              <ReactMarkdown source={job.apply} />
            </div>
          </div>
          <div>
            <Button
              className="d-md-block"
              height="50"
              variant="outline-danger"
              onClick={() => deleteJob()}
            >
              Delete
            </Button>
          </div>
        </div>

        <div>
          <Form>
            <Form.Group controlId="statusid">
              <Form.Row>
                <Col xs="auto" className="my-1">
                  <Form.Label>Status: {job.status}</Form.Label>

                  <Form.Control
                    as="select"
                    defaultValue="Update Status"
                    onChange={handleChange}
                  >
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
                      placeholderText="mm/dd/yyyy"
                      dateFormat="MM/dd/yyyy"
                      onChange={(date) => changeDate(date)}
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
  );
}
