import React, {useState} from 'react'
import { Card, Badge, Button, Collapse, Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import JobsPagination from '../JobsPagination';
import SearchForm from '../SearchForm';
import firebase from '../firebase'
import UserJobs from '../UserJobs'

export default function MyJobList(){
    const [jobs, setJobs] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("jobs").get()
            setJobs(data.docs.map(doc => doc.data()))
        }
        fetchData()
    },[])
    
    return(
        <Container className="my-4">
        <div className="my-4">
            <h1>My Jobs</h1>
            <Button href="/jobslist" className="mb-4">my jobs</Button>
            <ul>
            {jobs.map(job => {
               return <UserJobs key={job.id} job={job}/>
            })}
        </ul>
        </div>
        </Container>
    )
}