import React from "react"
import { Container, Button } from "react-bootstrap"
import '../App.css';

export default function startUpPage(){
    return(
        <Container>
        <div className="titleContainer">
            <h1 className="title mb-2">My Job Hunt Tracker</h1>
            <div>
                <Button className="btn" href="/signup">
             Sign up to begin</Button>
           
        </div>
        <br></br>
        <div>
            <a href='/login'>Already have an account? Login</a>
           
        </div>
        <br></br>
        <div>
            <p>To test application, login in with Email: test@email.com 
                Password: 123456
            </p>
        </div>
        </div>
        
        </Container>
    )
}