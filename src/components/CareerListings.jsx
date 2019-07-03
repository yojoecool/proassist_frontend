import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import {
  Button, Checkbox, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails,
  ExpansionPanelSummary, FormControlLabel, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, Star, StarBorder } from '@material-ui/icons';
import { useToken } from '../hooks';
import { toast } from '../modules';

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
  const [appliedJobs, setAppliedJobs] = React.useState(new Set());
  const [savedJobs, setSavedJobs] = React.useState(new Set());

  React.useEffect(() => {
    const getCareers = async () => {
      if (keyword && !filters.title) {
        filters.title = keyword.query;
      }
      const listings = await axios.get(`${backend}/careers`, { params: { filters } });
      setJobListings(listings.data.all);
    };

    getCareers();
  }, [filters]);

  React.useEffect(() => {
    const getUserJobs = async () => {
      const { REACT_APP_BACKEND_URL: backend } = process.env;

      const { data: userJobs } = await axios.get(
        `${backend}/careers/userJobs`,
        { headers: { authorization: 'Bearer ' + token }}
      );
      setAppliedJobs(new Set(userJobs.applied));
      setSavedJobs(new Set(userJobs.saved));
    }

    if (userType === 'JobSeeker') {
      getUserJobs();
    }
  }, [userType]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleApply = async (e, job) => {
    e.preventDefault();

    if (userType === 'Visitor') {
      toast('You need to be logged in to apply', 'error');
      return;
    }
    try {
      const data = {
        jobSeekerId: userId,
        jobId: job.jobId
      };
      await axios.post(
        `${backend}/careers/apply`,
        data,
        { headers: { authorization: 'Bearer ' + token } }
      );

      toast(`Application sent for ${job.title}`, 'success');
      setAppliedJobs(new Set([
        ...appliedJobs,
        job.jobId
      ]));
    } catch (err) {
      toast(`Error sending application for ${job.title}`, 'error');
    }
  };

  const handleSave = async (e, job) => {
    e.preventDefault();

    if (userType === 'Visitor') {
      e.target.checked = false;
      toast('You need to be logged in to save', 'error');
      return;
    }

    try {
      const { checked } = e.target;
      const data = {
        jobSeekerId: userId,
        jobId: job.jobId
      };

      const url = checked ? `${backend}/careers/save` : `${backend}/careers/unsave`;
      await axios.post(
        url,
        data,
        { headers: { authorization: 'Bearer ' + token } }
      );
      
      let toastMessage = '';
      let updatedJobs = new Set(savedJobs);
      if (checked) {
        updatedJobs.add(job.jobId); 
        toastMessage = 'Save Successful!';
      } else {
        updatedJobs.delete(job.jobId);
        toastMessage = `Successfully removed ${job.title} from saved list!`;
      }

      setSavedJobs(updatedJobs);
      toast(toastMessage, 'success');
    } catch (err) {
      toast(`Error saving job ${job.title}`, 'error');
    }
  };

  let jobsToShow = [];
  if (filters.saved && filters.applied) {
    jobsToShow = jobListings.filter(job => appliedJobs.has(job.jobId) && savedJobs.has(job.jobId));
  } else if (filters.saved) {
    jobsToShow = jobListings.filter(job => savedJobs.has(job.jobId));
  } else if (filters.applied) {
    jobsToShow = jobListings.filter(job => appliedJobs.has(job.jobId));
  } else {
    jobsToShow = jobListings;
  }

  return (
    <div className={classes.listings}>
      <p>{jobsToShow.length === 1 ? jobsToShow.length + ' result' : jobsToShow.length + ' results'}</p>
      {
        jobsToShow.map((job, index) => {
          return (
            <ExpansionPanel key={index} expanded={expanded === index} className={classes.listing} onChange={handleExpansion(index)}>
              <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <div className={classes.summary}>
                  <div>
                    <Typography
                      className={classes.title}
                      variant="h5"
                      color="textSecondary"
                      gutterBottom
                    >
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
                  control={
                    <Checkbox
                      icon={<StarBorder />}
                      checkedIcon={<Star />}
                      value='saved'
                      checked={savedJobs.has(job.jobId)}
                      onClick={(e) => handleSave(e, job)}
                    />
                  }
                />
                <Button
                  hidden={appliedJobs.has(job.jobId)}
                  size="medium"
                  onClick={(e) => handleApply(e, job)}
                >
                  Apply
                </Button>
                <Button
                  hidden={!appliedJobs.has(job.jobId)}
                  size="medium"
                  disabled
                >
                  Applied
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          )
        })
      }
    </div>
  );
}

export default CareerListings;
