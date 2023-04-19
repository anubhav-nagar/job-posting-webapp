import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { Button, CircularProgress } from "@mui/material";

const useStyle = makeStyles({
  wrapper: {
    backgroundColor: "#fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    padding: "20px",
  },
  child: {
    borderRadius: "5px",
    height: "53px",
    width: "33%",
    marginRight: "28px",
  },
});

export default function searchBar(props) {
  const classes = useStyle();

  const [loading, setloading] = useState(false);

  const [jobSearch, setjobSearch] = React.useState({
    type: "Full Time",
    location: "Remote",
  });

  const handleChange = (e) => {
    setjobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const search = async() => {
    setloading(true);
    await props.fetchCustomJobs(jobSearch);
    setloading(false);
  }

  console.log(jobSearch);

  return (
    <Box
      py={3}
      mt={-5}
      mb={2}
      bgcolor="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      className={classes.wrapper}
    >
      <FormControl className={classes.child}>
        <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          name="type"
          value={jobSearch.type}
          defaultValue="Full Time"
          label="Job Type"
          onChange={handleChange}
        >
          <MenuItem value={"Full Time"}>Fulll Time</MenuItem>
          <MenuItem value={"Part Time"}>Part Time</MenuItem>
          <MenuItem value={"Internship"}>Internship</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.child}>
        <InputLabel id="demo-simple-select-label">In-Office/Remote</InputLabel>
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          name="location"
          value={jobSearch.location}
          defaultValue="Remote"
          label="In-Office/Remote"
          onChange={handleChange}
        >
          <MenuItem value={"Remote"}>Remote</MenuItem>
          <MenuItem value={"In-Office"}>In-Office</MenuItem>
          <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
        </Select>
      </FormControl>

      <Button disabled={loading} onClick={search} variant="contained" className={classes.child}>
        {loading ? (
          <Box
            display="flex"
            width="74px"
            height="22px"
            justifyContent="center"
          >
            <CircularProgress color="secondary" size={20} />
          </Box>
        ) : (
          "Filter"
        )}
      </Button>
    </Box>
  );
}
