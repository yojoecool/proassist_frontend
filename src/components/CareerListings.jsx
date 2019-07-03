import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { Button, Checkbox, Divider, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, FormControlLabel, IconButton, Typography } from '@material-ui/core';
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
  },
  listing: {
    width: '100%'
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    color: "black"
  }
});

function CareerListings({ filters, keyword }) {
  const classes = useStyles();
  const { userType, userId } = useToken();
  const [token] = useLocalStorage('proAssistToken');
  const { REACT_APP_BACKEND_URL: backend } = process.env;

  const [jobListings, setJobListings] = React.useState([]);
  const [appliedJobs, setAppliedJobs] = React.useState(new Set());
  const [savedJobs, setSavedJobs] = React.useState(new Set());

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
      const listings = await axios.get(
        `${backend}/careers?filters=${filtersString}${user}`,
        { headers: { authorization: 'Bearer ' + token } }
      );
      setJobListings(listings.data.all);
      setAppliedJobs(new Set(listings.data.applied));
      setSavedJobs(new Set(listings.data.saved));
    };

    getCareers();
  }, [filters]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleApply = async (e, jobIndex) => {
    e.preventDefault()

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
    const response = await axios.post(
      `${backend}/careers/apply`,
      data, 
      { headers: { authorization: 'Bearer ' + token } }
    );
    if (response.status === 200) {
      toast(`Application sent for ${job.title}`, 'success');
      setAppliedJobs(new Set([
        ...appliedJobs,
        jobId
      ]));
    } else {
      toast(`Error sending application for ${job.title}`, 'error');
    }
  };

  const handleSave = async (e, jobIndex) => {
    e.preventDefault();

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
      const response = await axios.post(
        `${backend}/careers/save`,
        data, 
        { headers: { authorization: 'Bearer ' + token } }
      );
      if (response.status === 200) {
        setSavedJobs(new Set([
          ...savedJobs,
          jobId
        ]));
      }
    } else {
      const response = await axios.post(
        `${backend}/careers/unsave`,
        data, 
        { headers: { authorization: 'Bearer ' + token } }
      );
      if (response.status === 200) {
        const savedJobsCopy = new Set(savedJobs);
        savedJobsCopy.delete(jobId);
        setSavedJobs(savedJobsCopy);
      }
    }
    
  };

  return (
    <div className={classes.listings}>
      <p>{jobListings.length === 1 ? jobListings.length + ' result' : jobListings.length + ' results'}</p>
      { jobListings.map((job, index) => {
      return <ExpansionPanel key={index} expanded={expanded === index} className={classes.listing} onChange={handleExpansion(index)}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <div className={classes.column}>
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
          <div className={classes.column}>
            <div className={classes.row}>
              <Typography color="textSecondary">
                Type:&nbsp;
              </Typography>
              <Typography component="p">
                {job.type}
              </Typography>
            </div>
            <br />
            <div className={classes.row}>
              <Typography color="textSecondary">
                Description:&nbsp;
              </Typography>
              <Typography component="p">
                {job.description}
              </Typography>
            </div>
            <br />
            <Typography color="textSecondary">
              Skills: 
            </Typography>
            {/* <Typography> */}
              <ul>
                {job.skills.map((skill, index) => {
                  return <li key={index}>{skill}</li>
                })}
              </ul>  
            {/* </Typography> */}
            <br />
            <div className={classes.row}>
              <Typography color="textSecondary">
                Qualifications:&nbsp;
              </Typography>
              <Typography component="p">
                  {job.qualifications}
              </Typography>
            </div>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <FormControlLabel
            control={<Checkbox icon={<StarBorder />} checkedIcon={<Star />} value='saved' checked={savedJobs.has(jobListings[index].jobId)} onChange={(e) => handleSave(e, index)} />}
          />
          <Button hidden={appliedJobs.has(jobListings[index].jobId)} size="medium" onClick={(e) => handleApply(e, index)}>Apply</Button>
          <Button hidden={!appliedJobs.has(jobListings[index].jobId)} size="medium" disabled>Applied</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    })}
  </div>
  );
}

export default CareerListings;
