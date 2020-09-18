import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../firebase";
import { Card, Button, Form } from "react-bootstrap";
import { AuthContext } from "../Auth.js";
//login function
const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements; //grabs email and pasword from Form
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/jobslist"); //redirects to job list if login was successful
      } catch (error) {
        alert(error); //error login
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext); //grabs current users

  if (currentUser) {
    return <Redirect to="/jobslist" />;
  }

  return (
    <Card className="mb-3">
      <Card.Body className="loginbody">
        <div>
          <h1>Log in</h1>
          <Form onSubmit={handleLogin}>
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
