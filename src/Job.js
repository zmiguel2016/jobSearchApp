import React, { useState } from "react";
import { Card, Badge, Button, Collapse } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import firebase from "./firebase";
import getUser from "./Auth";

//Card Display for Github Job Posting

export default function Job({ job }) {
  const [open, setOpen] = useState(false); //view details

  //function to add job posting to user's job list on the firebase backend
  function jobQueue(job) {
    const db = firebase.firestore();
    db.collection("users")
      .doc(getUser().uid)
      .collection("jobs")
      .doc(job.id)
      .set({
        title: job.title,
        company: job.company,
        company_url: job.company_url,
        location: job.location,
        apply: job.how_to_apply,
        id: job.id,
        status: " ",
        date: " ",
      })
      .then(function () {
        alert("Job was added to your list");
      })
      .catch(function (error) {
        alert("Error refresh page");
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
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2">
              {job.type}
            </Badge>
            <Badge variant="secondary">{job.location}</Badge>
            <div style={{ wordBreak: "break-all" }}>
              <ReactMarkdown source={job.how_to_apply} />
            </div>
          </div>
          <div>
            <img
              className="d-none d-md-block"
              height="50"
              alt={job.company}
              src={job.company_logo}
            />
          </div>
        </div>
        <Card.Text>
          <Button
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            variant="primary"
          >
            {" "}
            {open ? "Hide Details" : "View Details"}
          </Button>
          <Button className="mg-2" onClick={() => jobQueue(job)}>
            Add to jobs list
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <ReactMarkdown source={job.description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
