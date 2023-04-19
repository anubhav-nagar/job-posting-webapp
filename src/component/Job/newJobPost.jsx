import React, { useState } from 'react'
import {Box, Button, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, CircularProgress} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: '14.5px',
        borderRadius: '5px',
        transition: '.3s',
        fontWeight: 300,
        cursor: 'pointer',
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#fff',
        }
    },
    included: {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
    }
  }));

const initState = {
    title: "",
    type: "Full Time",
    companyName: "",
    companyUrl: "",
    location: "Remote",
    link: "",
    description: "",
    skills: [],
    postedOn: new Date(),
};

function newJobPost(props) {
    const classes = useStyle();

    const [loading, setloading] = useState(false);

    const [jobDetails, setJobDetails] = React.useState(initState);

    const handleChange = (e) => {
        setJobDetails(oldState => ({
            ...oldState, 
            [e.target.name]: e.target.value,
        } ))
    };

    const closeJobModal = () => {
        setJobDetails(initState);
        setloading(false);
        props.closeNewJobDialog();
    }

    const skills = ['Javascript', 'React', 'Node', 'MongoDB', 'SQL', 'Azure'];

    const addRemoveSkills = (skill) => {
        jobDetails.skills.includes(skill)
        ? setJobDetails((oldState) => ({...oldState, skills: oldState.skills.filter(s => s!==skill)}))
        : setJobDetails((oldState) => ({...oldState, skills: oldState.skills.concat(skill)}))
    }

    const handleSubmit = async () => {
        for(const field in jobDetails) {
            if(typeof jobDetails[field] === 'string' && !jobDetails[field])
                return console.log('Not validated');
        }
        if(!jobDetails.skills.length) 
            return console.log('Not validated');
            
        // return console.log('Validated');
        setloading(true);
        await props.postNewJob(jobDetails);
        closeJobModal();
    }

    console.log(jobDetails);

  return (
    <Dialog open={props.newJobDialog} >
        <DialogTitle>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                Post Job
                <IconButton onClick={closeJobModal}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent >
            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <FilledInput onChange={handleChange} name="title" value={jobDetails.title} placeholder='Job Title *' disableUnderline fullWidth/>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <Select onChange={handleChange} name="type" value={jobDetails.type} variant='filled' disableUnderline  defaultValue='Full Time'>
                            <MenuItem value='Full Time'>Full Time</MenuItem>
                            <MenuItem value='Part Time'>Part Time</MenuItem>
                            <MenuItem value='Internship'>Internship</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FilledInput onChange={handleChange} name="companyName" value={jobDetails.companyName} placeholder='Company Name *' disableUnderline fullWidth/>
                </Grid>
                <Grid item xs={6} >
                    <FilledInput onChange={handleChange} name="companyUrl" value={jobDetails.companyUrl} placeholder='Company URL *' disableUnderline fullWidth/>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <Select name="location" value={jobDetails.location} onChange={handleChange} variant='filled' disableUnderline  defaultValue='Remote'>
                            <MenuItem value={"Remote"}>Remote</MenuItem>
                            <MenuItem value={"In-Office"}>In-Office</MenuItem>
                            <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FilledInput onChange={handleChange} name="link" value={jobDetails.link} placeholder='Job Link *' disableUnderline fullWidth/>
                </Grid>
                <Grid item xs={12} >
                    <FilledInput onChange={handleChange} name="description" value={jobDetails.description} placeholder='Job Description *' disableUnderline fullWidth multiline rows={4}/>
                </Grid>
            </Grid>
            <Box mt={2}>
                <Typography variant='subtitle1'>Skills *</Typography>
                <Box display='flex'>
                    {skills.map(skill => <Box key={skill} onClick={()=>addRemoveSkills(skill)} className={`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included}`}>{skill}</Box>)}
                </Box>
            </Box>
        </DialogContent>
        <DialogActions>
            <Box mx={2} mb={2} color='red' width='100%' display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant='caption'>*Required Fields Must be Filled before Posting Jobs</Typography>
                <Button onClick={handleSubmit} variant='contained' color='primary' disabled={loading}> 
                    {loading ? (
                        <Box display='flex' width='74px'height='22px' justifyContent='center'>
                            <CircularProgress color="secondary" size={20} />
                        </Box>
                    ) : (
                        "Post Jobs"
                    )
                    }
                </Button>
            </Box>
        </DialogActions>
    </Dialog>
  )
}

export default newJobPost