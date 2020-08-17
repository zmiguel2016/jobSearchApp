import React, {useState} from 'react';

import { 
    BrowserRouter as Router, 
    Route, 
    Switch, 
    Link, 
    Redirect } from "react-router-dom";

import startUpPage from "./pages";
import PageNotFound from "./pages/404";
import JobsList from "./pages/jobslist"; 
import MyJobsList from "./pages/myjobs"

function App() {
  
    return <Router>
      <Switch>
      <Route exact path="/" component={startUpPage} />
      <Route exact path="/jobslist" component={JobsList} />
      <Route exact path="/myjobs" component={MyJobsList} />
      <Route exact path="/404" component={PageNotFound} />
      <Redirect to="/404"/>
      </Switch>
    </Router>

      
  
}

export default App;
