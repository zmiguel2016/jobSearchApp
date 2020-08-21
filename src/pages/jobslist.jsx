import React, {useState} from "react"
import useFetchJobs from '../useFetchJobs'
import { Container, Button } from 'react-bootstrap'
import Job from '../Job'
import JobsPagination from '../JobsPagination';
import SearchForm from '../SearchForm';
import firebase from "../firebase"

function JobsList(){
    const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const {jobs, loading, error, hasNextPage} = useFetchJobs(params, page)
  function handleParamChange(e){
    const param = e.target.name 
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value}
    })
  }
  return(
    <Container className="my-4">
      <div className="d-flex justify-content-between">
            <h1>Jobs List</h1>
            <div >
            <Button  className ="d-md-block"  onClick={() => firebase.auth().signOut()}>Sign out</Button>
            </div>
            </div>
      <Button href="/myjobs">My Jobs</Button>
      <SearchForm params={params} onParamChange= {handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Refresh the page.</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job= {job} />
      })}
       <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  )
}
export default JobsList;
