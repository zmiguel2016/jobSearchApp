import React from "react"
import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../App.css';

export default function startUpPage(){
    return(
        <Container>
        <div className="titleContainer">
            <h1 className="title">My Job Search Tracker</h1>
            <div>
                <Button className="btn" href="/jobslist">
             Jobs</Button>
             <Button className="btn" href="/myjobs">My jobs</Button>
        </div>
        </div>
        
        </Container>
    )
}