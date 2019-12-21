import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import {
  Button,
  Checkbox,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core";
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, Star, StarBorder } from '@material-ui/icons';
import classNames from "classnames";
import { useToken } from '../hooks';
import { toast } from '../modules';
import { JobDetails, JobSummary } from './Job';

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
  const [pageSize, setPageSize] = React.useState(10);
  const [sortColumn, setSort] = React.useState('');

  React.useEffect(() => {
    const getCareers = async () => {
      try {
        setLoad(true);

        if (keyword && !filters.title) {
          filters.title = keyword.query;
        }
        const listings = await axios.post(`${backend}/careers`, { filters });
        setLoad(false);
        setPage(0);
        setJobListings(listings.data.all);

        if (listings.data.all.length < pageSize) {
          setTop(listings.data.all.length);
        } else {
          setTop(pageSize);
        }
      } catch (err) {
        setLoad(true);
        toast('Error during search. No applicable listings found.', 'error');
      }
    };

    getCareers();
  }, [filters, keyword, backend, pageSize]);

  React.useEffect(() => {
    const getUserJobs = async () => {
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
  }, [userType, token, backend]);

  const sortBy = (e) => {
    const sort = e.target.value;
    let newJobListings = [];

    switch (sort) {
      case 'Applicants':
        newJobListings = jobListings.sort((a, b) => {
          if (a.AppliedBy.length < b.AppliedBy.length) return 1;
          if (b.AppliedBy.length < a.AppliedBy.length) return -1;
          return 0;
        });
        break;
      case 'Alpha':
        newJobListings = jobListings.sort((a, b) => {
          const aTitle = a.title.toUpperCase();
          const bTitle = b.title.toUpperCase();

          if (aTitle < bTitle) return -1;
          if (bTitle < aTitle) return 1;
          return 0;
        });
        break;
      default:
        return;
    }

    setJobListings(newJobListings);
    resetPageSize({ target: { value: pageSize } });
    setSort(sort);
  };

  const resetPageSize = (e) => {
    const size = parseInt(e.target.value);
    setPageSize(size);
    setPage(0);
    if (jobListings.length <= size) {
      setTop(jobListings.length);
    } else {
      setTop(size);
    }
  };

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
      newPage = page + pageSize;
      newTop =
        top + pageSize >= jobListings.length
          ? jobListings.length
          : top + pageSize;
    } else {
      newPage = page - pageSize;
      newTop = top - pageSize <= pageSize ? pageSize : top - pageSize;
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
      <div
        className={classNames("row", "justify-content-around", "w-100", "mx-0")}
      >
        <FormControl className={classNames("col-sm", "col-md-6", "col-lg-4", "my-2")}>
          <InputLabel>Sort By</InputLabel>
          <Select native value={sortColumn} onChange={sortBy}>
            <option value={""}></option>
            <option hidden={userType !== "Admin"} value={"Applicants"}>
              Applicants
            </option>
            <option value={"Alpha"}>Alphabetical</option>
          </Select>
        </FormControl>
        <FormControl className={classNames("col-sm", "col-md-6", "col-lg-4", "my-2")}>
          <InputLabel>Number of Results</InputLabel>
          <Select native value={pageSize} onChange={resetPageSize}>
            <option value={10}>10</option>
            <option value={20}>25</option>
            <option value={30}>50</option>
          </Select>
        </FormControl>
      </div>
      {pageComponent()}
      {jobsToShow.slice(page, top + 1).map((job, index) => {
        return (
          <ExpansionPanel
            key={index}
            expanded={expanded === index}
            className={classes.listing}
            onChange={handleExpansion(index)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <JobSummary job={job} userType={userType} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <JobDetails job={job} />
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button
                hidden={userType !== "Admin"}
                size="medium"
                component={Link}
                to={`/careers/viewApplicants/${job.jobId}`}
              >
                View Applicants
              </Button>
              <Button
                hidden={userType !== "Admin"}
                size="medium"
                component={Link}
                to={`/careers/editJob/${job.jobId}`}
              >
                Edit
              </Button>
              <FormControlLabel
                hidden={userType !== "JobSeeker"}
                control={
                  <Checkbox
                    icon={<StarBorder />}
                    checkedIcon={<Star />}
                    value="saved"
                    checked={savedJobs.has(job.jobId)}
                    onChange={e => handleSave(e, job)}
                  />
                }
              />
              <Button
                hidden={appliedJobs.has(job.jobId) || userType !== "JobSeeker"}
                size="medium"
                onClick={e => handleApply(e, job)}
              >
                Apply
              </Button>
              <Button
                hidden={!appliedJobs.has(job.jobId) || userType !== "JobSeeker"}
                size="medium"
                disabled
              >
                Applied
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        );
      })}
      {pageComponent()}
    </div>
  );
}

export default CareerListings;