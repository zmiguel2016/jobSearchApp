import React from "react"
import { Container, Button } from "react-bootstrap"
import '../App.css';

export default function startUpPage(){
    return(
        <Container>
        <div className="titleContainer">
            <h1 className="title">My Job Search Tracker</h1>
            <div>
                <Button className="btn" href="/signup">
             Sign up to Begin</Button>
           
        </div>
        </div>
        
        </Container>
    )
}