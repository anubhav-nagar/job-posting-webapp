import React from "react";
import {
  Box,
  Grid,
  FilledInput,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns'

const checkListedJob = (props) => {
  return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
        <DialogTitle>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                {props.job.title} @ {props.job.companyName}
                <IconButton onClick={props.closeCheckJob}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box display='flex' alignItems='center' mb={0.5}>
                <Box mr={2}>
                <Typography variant="body2">Posted On: </Typography>
                    </Box>
                <Box>
                    <Typography variant="caption">{props.job.postedOn && format(props.job.postedOn, 'dd/MMM/yyyy HH:MM')}</Typography>
                </Box>
            </Box>
            <Box display='flex' alignItems='center' mb={0.5}>
                <Box mr={2}>
                <Typography variant="body2">Job Type:  </Typography>
                    </Box>
                <Box>
                    <Typography variant="caption">{props.job.type}</Typography>
                </Box>
            </Box>
            <Box display='flex' alignItems='center' mb={0.5}>
                <Box mr={2}>
                <Typography variant="body2">Job Location:  </Typography>
                    </Box>
                <Box>
                    <Typography variant="caption">{props.job.location}</Typography>
                </Box>
            </Box>
            <Box display='flex' alignItems='center' mb={0.5}>
                <Box mr={2}>
                <Typography variant="body2">Company Name:  </Typography>
                    </Box>
                <Box>
                    <Typography variant="caption">{props.job.companyName}</Typography>
                </Box>
            </Box>
            <Box display='flex' alignItems='center' mb={0.5}>
                <Box mr={2}>
                <Typography variant="body2">Company Website:  </Typography>
                    </Box>
                <Link href={props.job.companyUrl} underline="hover" variant="caption" color='secondary'>{props.job.companyUrl}</Link>
            </Box>
            <Box display='flex' alignItems='center' mb={1}>
                <Box mr={2}>
                    <Typography variant="body2">Skills:  </Typography>
                </Box>
                <Box display='flex'>
                    {props.job.skills && props.job.skills.map(skill => <Box key={skill} mr={1} border='.1px solid black' borderRadius='10px' p={0.3}>{skill}</Box>)}
                </Box>
            </Box>
            <Box>
                <Box mr={2}>
                <Typography variant="body2">Job Description:  </Typography>
                    </Box>
                <Box>
                    <Typography variant="caption">{props.job.description}</Typography>
                </Box>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" component="a" href={props.job.link} target="_blank" color="secondary" >Apply</Button>
        </DialogActions>
    </Dialog>
  );
};

export default checkListedJob;
