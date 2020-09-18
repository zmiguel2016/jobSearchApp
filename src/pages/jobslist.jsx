import React, { useState } from "react";
import useFetchJobs from "../useFetchJobs";
import { Container, Button } from "react-bootstrap";
import Job from "../Job";
import JobsPagination from "../JobsPagination";
import SearchForm from "../SearchForm";
import firebase from "../firebase";

//page for github jobs list
function JobsList() {
  const [params, setParams] = useState({}); //search param state
  const [page, setPage] = useState(1); //page state
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  //update search paramaters
  function handleParamChange(e) {
    const param = e.target.name; //search param title
    const value = e.target.value; //actual search value
    setPage(1); //resets the page
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    }); //sets new search params
  }
  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between">
        <h1>Jobs List</h1>
        <div>
          <Button
            className="d-md-block"
            onClick={() => firebase.auth().signOut()} //sign out of user account
          >
            Sign out
          </Button>
        </div>
      </div>
      <Button href="/myjobs">My Jobs</Button>
      <SearchForm params={params} onParamChange={handleParamChange} />

      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Refresh the page.</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}
export default JobsList;
