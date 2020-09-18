import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Card, Button, Form } from "react-bootstrap";
import firebase from "../firebase";
import "../App.css";

//signup function
const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/jobslist");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <Card className="mb-3">
      <Card.Body className="loginbody">
        <div>
          <h1>Sign up</h1>
          <Form onSubmit={handleSignUp}>
            <Form.Label>Email</Form.Label>
            <div>
              <Form.Label>
                <input name="email" type="email" placeholder="Email" />
              </Form.Label>
            </div>
            <Form.Label>Password</Form.Label>
            <div>
              <Form.Label>
                <input name="password" type="password" placeholder="Password" />
              </Form.Label>
            </div>
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
