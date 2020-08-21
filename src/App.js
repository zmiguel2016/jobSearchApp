import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch,  
    Redirect } from "react-router-dom";
import startUpPage from "./pages";
import PageNotFound from "./pages/404";
import JobsList from "./pages/jobslist"; 
import MyJobsList from "./pages/myjobs";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute"

function App() {
  
    return <AuthProvider>
    <Router>
      <Switch>
      <Route exact path="/" component={startUpPage} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path ="/login" component={Login} />
      <PrivateRoute exact path="/jobslist" component={JobsList} />
      <PrivateRoute exact path="/myjobs" component={MyJobsList} />
      <Route exact path="/404" component={PageNotFound} />
      <Redirect to="/404"/>
      </Switch>
    </Router>
    </AuthProvider>

      
  
}

export default App;
