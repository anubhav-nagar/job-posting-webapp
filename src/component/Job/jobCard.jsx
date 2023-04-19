import React from 'react';
import {Box, Grid, Typography, Button} from '@mui/material';
import { makeStyles } from "@mui/styles";
import {differenceInHours} from 'date-fns'

const useStyle = makeStyles((theme) => ({
    wrapper: {
      border: '1px solid #e8e8e8',
      cursor: 'pointer',
      transition: '.2s',
      "&:hover":{
        boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
        borderLeft: '6px solid #4D64E4',
      },
    },
    companyName: {
      fontSize: '13.5px',
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(0.75),
      borderRadius: '5px',
      display: 'inline-block',
      fontWeight: 600,
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: '14.5px',
        borderRadius: '5px',
        transition: '.3s',
        fontWeight: 300,
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
    }
  }));

const jobCard = (props) => {
    const classes = useStyle();
  return (
    <Box p={2} className={classes.wrapper}>
        <Grid container alignItems='center'>
            <Grid item xs>
                <Box mb={2}>
                  <Typography variant='subtitle1'>{props.title}</Typography>
                </Box>
                <Typography variant='subtitle1' className={classes.companyName}>{props.companyName}</Typography>
            </Grid>
            <Grid item container xs>
                {props.skills.map(skill => <Grid className={classes.skillChip} key={skill} item mx={0.5} my={0.5}>{skill}</Grid>)}
            </Grid>
            <Grid item container direction='column' alignItems='flex-end' xs>
                <Grid item>
                <Typography variant='caption'>{differenceInHours(Date.now(), props.postedOn)} Hrs Ago | {props.type} | {props.location}</Typography>
                </Grid>
                <Grid item>
                    <Box mt={2}>
                <Button onClick={props.openCheckDialog} variant='outlined' color='secondary'>Check</Button>
                </Box>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}

export default jobCard