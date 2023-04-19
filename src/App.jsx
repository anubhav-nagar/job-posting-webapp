import './App.css'
import React, {useState, useEffect} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Grid, CircularProgress, Box, Button } from "@mui/material";
import theme from './theme/theme'
import Navbar from "./component/navbar";
import SearchBar from './component/searchBar';
import JobCard from './component/Job/jobCard';
import NewJobPost from './component/Job/newJobPost';
import db from './firebase/config';
import CloseIcon from '@mui/icons-material/Close';
import { collection, getDocs, addDoc, orderBy, query, where } from "firebase/firestore";
import CheckListedJob from './component/Job/checkListedJob';
const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setloading] = useState(true);

  const [customSearch, setCustomSearch] = useState(false);

  const [newJobDialog, setnewJobDialog] = useState(false);

  const [checkJob, setCheckJob] = useState({});

  const fetchJobs = async () => {
    setCustomSearch(false);
    setloading(true);  
    await getDocs(query(collection(db, "jobs"), orderBy("postedOn", "desc")))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id, postedOn: doc.data().postedOn.toDate(), }));
                setJobs(newData);   
                setloading(false);             
            // console.log(newData);
        })
        .catch(err => console.log(err))
  }

  const fetchCustomJobs = async (jobSearch) => {
    // console.log(jobSearch.location, jobSearch.type);
    setCustomSearch(true);
    setloading(true);  
    await getDocs(query(collection(db, "jobs"), 
    where("location", "==", jobSearch.location), 
    where("type", "==", jobSearch.type), 
    orderBy("postedOn", "desc")))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id, postedOn: doc.data().postedOn.toDate(), }));
                setJobs(newData);   
                setloading(false);             
            // console.log(newData);
        })
        .catch(err => console.log(err))
  }

  //funtion to post the jobs in firestore as a doc in collection
  const postJob = async jobDetails => {
    const jobCollRef = collection(db, "jobs")
    await addDoc(jobCollRef, {
      ...jobDetails,
      postedOn: new Date()
      // postedOn: db.Fields.Timestamp.fromDate(new Date()),  //*******fix this to push correct timestamp
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.message));
    
      fetchJobs()
  }

  useEffect(() => {
    fetchJobs();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Navbar openNewJobDialog={() => setnewJobDialog(true)}/>
      <NewJobPost newJobDialog={newJobDialog} closeNewJobDialog={() => setnewJobDialog(false)} postNewJob={postJob}/>
      <CheckListedJob job={checkJob} closeCheckJob={() => setCheckJob({})}/>
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item xs={10}>
          <SearchBar fetchCustomJobs={fetchCustomJobs} />
          {loading ? (
            <Box display='flex' justifyContent='center'>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {
                customSearch && (
                  <Box display='flex' justifyContent='flex-end' my={2}> 
                    <Button color='secondary' onClick={fetchJobs}>
                      <CloseIcon size={20}  />
                      Custom Search
                    </Button>
                  </Box>
                )
              }
            {
            jobs.map((job) => {
              return <JobCard openCheckDialog={() => {
                setCheckJob({...job})
              }} key={job.id} {...job}/>
            })}
            <Box height='80px'></Box>
            </>
          )
        }
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
