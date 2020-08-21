import React from 'react'
import { Button, Container } from 'react-bootstrap'
import firebase from '../firebase'
import UserJobs from '../UserJobs'
import getUser from "../Auth"


export default function MyJobList(){

    const [isShowing, setIsShowing] = React.useState(false);
    const closeModalHandler = () => setIsShowing(false);

    const [jobs, setJobs] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection(`users/${getUser().uid}/jobs`).get()
            setJobs(data.docs.map(doc => doc.data()))
        }
        fetchData()
    },[])
    
    return(
        <Container className="my-4">
        <div>
            <div className="d-flex justify-content-between">
            <h1>My Jobs</h1>
            <div >
            
            <Button  className ="d-md-block"  onClick={() => firebase.auth().signOut()}>Sign out</Button>
            </div>
            </div>
        
            <Button href="/jobslist" className="mb-4">Jobs list</Button>
            <ul>
            {jobs.map(job => {
               return <UserJobs key={job.id} job={job}/>
            })}
        </ul>
        </div>
        
       
        </Container>
    )
}