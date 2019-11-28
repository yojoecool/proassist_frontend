import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import {
  Button, Checkbox, Chip, Divider, ExpansionPanel, ExpansionPanelActions,
  ExpansionPanelDetails, ExpansionPanelSummary, FormControlLabel, Typography,
  IconButton, CircularProgress
} from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, Star, StarBorder } from '@material-ui/icons';
import { useToken } from '../hooks';
import { toast } from '../modules';

const useStyles = makeStyles(theme => ({
  listings: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  listing: {
    width: '100%',
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
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  page: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}));

function CareerListings({ filters, keyword }) {
  const classes = useStyles();
  const { userType } = useToken();
  const [token] = useLocalStorage('proAssistToken');
  const { REACT_APP_BACKEND_URL: backend } = process.env;

  const [jobListings, setJobListings] = React.useState([]);
  const [appliedJobs, setAppliedJobs] = React.useState(new Set());
  const [savedJobs, setSavedJobs] = React.useState(new Set());
  const [page, setPage] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [loading, setLoad] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const getCareers = async () => {
      try {
        setLoad(true);
        if (keyword && !filters.title) {
          filters.title = keyword.query;
        }
        const listings = await axios.get(`${backend}/careers`, { params: { ...filters } });
        setLoad(false);
        setPage(0);

        if (listings.data.all.length <= 10) {
          setTop(listings.data.all.length);
        } else {
          setTop(10);
        }

        setJobListings(listings.data.all);
      } catch (err) {
        setLoad(true);
        toast('Error during search. No applicable listings found.', 'error');
      }
    };

    getCareers();
  }, [filters, backend, keyword]);

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
  }, [userType, token]);

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
      const data = { jobId: job.jobId };
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

  const changePage = (next) => {
    let newPage;
    let newTop;
    if (next) {
      newPage = page + 10;
      newTop = top + 10 >= jobListings.length
        ? jobListings.length : top + 10;
    } else {
      newPage = page - 10;
      newTop = top - 10 <= 10 ? 10 : top - 10;
    }

    setExpanded(false);
    setPage(newPage);
    setTop(newTop);
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

      const data = { jobId: job.jobId };
      const url = checked ? `${backend}/careers/save` : `${backend}/careers/unsave`;
      await axios.post(
        url,
        data,
        { headers: { authorization: 'Bearer ' + token } }
      );
      
      let updatedJobs = new Set(savedJobs);
      if (checked) {
        updatedJobs.add(job.jobId); 
      } else {
        updatedJobs.delete(job.jobId);
      }

      setSavedJobs(updatedJobs);
    } catch (err) {
      toast(`Error saving ${job.title}`, 'error');
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

  const pageComponent = () => {
    let returnComp;
    if (loading) {
      returnComp = (<CircularProgress color="secondary" />);
    } else {
      const currPage = jobListings.length > 0 ? page + 1 : 0;
      returnComp = (
        <>
          <IconButton
            onClick={() => changePage(false)}
            disabled={page === 0}
          >
            <NavigateBefore />
          </IconButton>

          {!loading && (<div>{currPage} - {top} of {jobListings.length}</div>)}

          <IconButton
            onClick={() => changePage(true)}
            disabled={top >= jobListings.length || jobListings.length <= 10}
          >
            <NavigateNext />
          </IconButton>
        </>
      );
    }

    return (
      <div className={classes.page}>
        {returnComp}
      </div>
    )
  }

  return (
    <div className={classes.listings}>
      {pageComponent()}
      { 
        jobsToShow.slice(page, top + 1).map((job, index) => {
          return (
            <ExpansionPanel key={index} expanded={expanded === index} className={classes.listing} onChange={handleExpansion(index)}>
              <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <div className={classes.column}>
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
                <div className={classes.column}>
                  <div className={classes.row}>
                    <Typography color="textSecondary">
                      Type:&nbsp;
                    </Typography>
                    <Typography component="pre">
                      {job.type}
                    </Typography>
                  </div>
                  <br />
                  <Typography color="textSecondary">
                    Description:&nbsp;
                  </Typography>
                  <Typography component="pre">
                    {job.description}
                  </Typography>
                  <br />
                  <Typography color="textSecondary">
                    Skills: 
                  </Typography>
                  <Typography component="pre">
                    {job.skills.map((skill, index) => {
                      return <Chip
                        key={index}
                        label={skill}
                        className={classes.chip}
                        />
                    })}
                  </Typography>
                  <br />
                  <div className={classes.row}>
                    <Typography color="textSecondary">
                      Qualifications:&nbsp;
                    </Typography>
                    <Typography component="pre">
                      {job.qualifications}
                    </Typography>
                  </div>
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <FormControlLabel
                  control={
                    <Checkbox 
                      icon={<StarBorder />} 
                      checkedIcon={<Star />} 
                      value='saved' 
                      checked={savedJobs.has(job.jobId)} 
                      onChange={(e) => handleSave(e, job)} 
                    />}
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
      {pageComponent()}
    </div>
  );
}

export default CareerListings;