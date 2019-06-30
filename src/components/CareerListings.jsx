import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { Button, Checkbox, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, FormControlLabel, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, Star, StarBorder } from '@material-ui/icons';
import { useToken } from '../hooks';
import { toast } from '../modules';
import classNames from 'classnames';
import mockedJobs from '../mocks/mockedJobs';

const useStyles = makeStyles({
  listings: {
    width: '100%',
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    // backgroundColor: 'pink'
  },
  listing: {
    width: '100%'
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  star: {
    display: 'flex',
    justifyContent: 'flexStart'
  },
  summary: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: "black",
    // flexBasis: "33.33%",
    // flexShrink: 0
  }
});

function CareerListings({ filters, keyword }) {
  const classes = useStyles();
  const { userType, userId } = useToken();
  const [token] = useLocalStorage('proAssistToken');
  const { REACT_APP_BACKEND_URL: backend } = process.env;

  const [jobListings, setJobListings] = React.useState([]);
  const [appliedJobs, setAppliedJobs] = React.useState([]);
  const [savedJobs, setSavedJobs] = React.useState([]);

  React.useEffect(() => {
    const getCareers = async () => {
      if (keyword && !filters.title) {
        filters.title = keyword.query;
      }
      let user = '';
      if (userId) {
        user = `&userId=${userId}`;
      }
      const filtersString = JSON.stringify(filters);
      const listings = await axios.get(`${backend}/careers?filters=${filtersString}${user}`);
      console.log('listings data', listings.data);
      setJobListings(listings.data.all);
      setAppliedJobs(listings.data.applied.map(job => JSON.stringify(job)));
      setSavedJobs(listings.data.saved.map(job => JSON.stringify(job)));
    };

    getCareers();
  }, [filters]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleApply = async (e, jobIndex) => {
    e.preventDefault()
    console.log('jobIndex applied:', jobIndex);

    if (userType === 'Visitor') {
      toast('You need to be logged in to apply', 'error');
      return;
    }
    const job = jobListings[jobIndex];
    const jobId = job.jobId;
    const data = {
      jobSeekerId: userId,
      jobId
    };
    console.log('applying for jobId in fe:', jobId);
    const response = await axios.post(
      `${backend}/careers/apply`,
      data, 
      { headers: { authorization: 'Bearer ' + token } }
    );
    // if response is 200, toast success
    if (response.status === 200) {
      toast(`Application sent for ${job.title}`, 'success');
      setAppliedJobs([
        ...appliedJobs,
        job
      ]);
      console.log('appliedJobs state:', appliedJobs);
    } else {
      toast(`Error sending application for ${job.title}`, 'error');
    }
  };

  const handleSave = async (e, jobIndex) => {
    e.preventDefault();
    console.log('jobIndex saved:', jobIndex);

    if (userType === 'Visitor') {
      e.target.checked = false;
      toast('You need to be logged in to save', 'error');
      return;
    }

    const job = jobListings[jobIndex];
    const jobId = jobListings[jobIndex].jobId;
    const data = {
      jobSeekerId: userId,
      jobId
    };
    if (e.target.checked) {
      console.log('saving for jobId in fe:', jobId);
      const response = await axios.post(
        `${backend}/careers/save`,
        data, 
        { headers: { authorization: 'Bearer ' + token } }
      );
      // if response is 200, toast success
      if (response.status === 200) {
        setSavedJobs([
          ...savedJobs,
          job
        ]);
        toast(`Job ${job.title} saved!`, 'success');
        // console.log('savedJobs length:', savedJobs.length);
      } else {
        toast(`Error saving job ${job.title}`, 'error');
      }
    } else {
      console.log('unsaving');
      const response = await axios.post(
        `${backend}/careers/unsave`,
        data, 
        { headers: { authorization: 'Bearer ' + token } }
      );
      // if response is 200, toast success
      if (response.status === 200) {
        const savedJobsCopy = savedJobs;
        const index = savedJobsCopy.indexOf(job);
        savedJobsCopy.splice(index, 1);
        setSavedJobs(savedJobsCopy);
        toast(`Job ${job.title} unsaved!`, 'success');
      } else {
        toast(`Error saving job ${job.title}`, 'error');
      }
    }
    
  };

  return (
    // <div className={classes.root}>
      <div className={classes.listings}>
        <p>{jobListings.length === 1 ? jobListings.length + ' result' : jobListings.length + ' results'}</p>
        { jobListings.map((job, index) => {
        return <ExpansionPanel key={index} expanded={expanded === index} className={classes.listing} onChange={handleExpansion(index)}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <div className={classes.summary}>
              <div>
                <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
                  {job.title}
                </Typography>
                <Typography color="textSecondary">
                  {job.city}, {job.state}
                </Typography>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component="p">
              {job.description}
            </Typography>
            <div>
              Skills: 
              <ul>
                {job.skills.map((skill, index) => {
                  return <li key={index}>{skill}</li>
                })}
              </ul>  
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <FormControlLabel
              control={<Checkbox icon={<StarBorder />} checkedIcon={<Star />} value='saved' checked={savedJobs.includes(JSON.stringify(jobListings[index]))} onClick={(e) => handleSave(e, index)} />}
            />
            {console.log(`jobIndex ${index} should be checked ${savedJobs.includes(JSON.stringify(jobListings[index]))}`)}
            <Button hidden={appliedJobs.includes(JSON.stringify(jobListings[index]))} size="medium" onClick={(e) => handleApply(e, index)}>Apply</Button>
            <Button hidden={!appliedJobs.includes(JSON.stringify(jobListings[index]))} size="medium" disabled>Applied</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      })}
      </div>
    // </div>
  );
}

export default CareerListings;
