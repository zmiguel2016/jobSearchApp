import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../firebase"
import { Card, Button, Form } from 'react-bootstrap'
import { AuthContext } from "../Auth.js";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/jobslist");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/jobslist" />;
  }

  return (
    <Card className = "mb-3"> 
      <Card.Body>
    <div>
      <h1>Log in</h1>
      <Form onSubmit={handleLogin}>
        <Form.Label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </Form.Label>
        <Form.Label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </Form.Label>
        <Button type="submit">Log in</Button>
      </Form>
    </div>
    <div>
    <a href="/signup">Dont have an account? Sign up</a>
    </div>
    </Card.Body>
    </Card>
  );
};

export default withRouter(Login);