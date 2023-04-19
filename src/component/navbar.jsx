import React from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

const navbar = (props) => {
  return (
    <Box py={10} bgcolor="secondary.main">
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={10}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h4" component="h4" color="white">
              Get Your Dream Job
            </Typography>
            <Button onClick={props.openNewJobDialog} variant="contained" endIcon={<WorkIcon />}>
              Post Job
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default navbar;
