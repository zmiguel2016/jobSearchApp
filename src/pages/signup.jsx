import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Card, Button, Form } from 'react-bootstrap'
import firebase from "../firebase"

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/jobslist")
    
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <Card className = "mb-3"> 
      <Card.Body>
    <div>
      <h1>Sign up</h1>
      <Form onSubmit={handleSignUp}>
        <Form.Label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </Form.Label>
        <Form.Label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </Form.Label>
        <Button type="submit">Sign up</Button>
      </Form>
    </div>
    <div>
    <a href="/login">Already have an account? Login</a>
    </div>
    </Card.Body>
    </Card>
  );
};

export default withRouter(SignUp);