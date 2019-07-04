import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';
import {
  Typography, Button
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useToken } from '../../hooks';
import { toast } from '../../modules';
import { JobListing } from '../company';
import { CompanyListing } from '../admin';

const useStyles = makeStyles(theme => ({
  root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      flexDirection: 'column',
      marginTop: '3%',
      marginBottom: '3%',
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: '3%',
    [theme.breakpoints.down('md')] : {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  subcontent: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')] : {
      width: '80%',
    },
  },
  header: {
    textAlign: 'center'
  },
  subheader: {
    marginTop: '1%',
    marginBottom: '1%'
  },
  companyList: {
    height: 350,
    overflowY: 'scroll'
  },
  jobList: {
    height: 550,
    overflowY: 'scroll'
  },
  button: {
    width: 215,
    margin: 25,
    '&:hover': {
        color: theme.palette.blue.light
    },
    [theme.breakpoints.down('md')] : {
      width: '80%',
      margin: 20,
    },
  },
  buttonDiv: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: 20,
      [theme.breakpoints.down('md')] : {
        justifyContent: 'center'
      },
  },
  center: {
    justifyContent: 'center'
  }
}));


function Admin(props) {
  const classes = useStyles();
  const { email } = useToken();

  const [token] = useLocalStorage('proAssistToken');


  const [moreJobs, updateMoreJobs] = React.useState(true)
  const [jobs, updateJobs] = React.useState([]);
  const [jobOffset, incrementJobOffset] = React.useState(0);

  const [moreCompanies, updateMoreCompanies] = React.useState(true)
  const [companies, updateCompanies] = React.useState([]);
  const [companyOffset, incrementCompanyOffset] = React.useState(0);
  const limit = 5;

  const refreshCompanies = async () => {
    await incrementCompanyOffset(0);
    await updateCompanies([]);
    await getPendingCompanies();
  }

  const getPendingCompanies = async () => {
    try {
      const response = await 
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getPendingCompanies`, 
        { headers: { 'authorization': 'Bearer ' + token },
          params: { companyOffset, limit }
        });
      console.log(response)
      if (response.data.pendingCompanies.length < 5) {
        updateMoreCompanies(false);
      }

      updateCompanies([
        ...companies,
        ...response.data.pendingCompanies
      ]);
      incrementCompanyOffset(companyOffset + 5);
      
    } catch (err) {
      console.log(err);
      toast('Unable to load companies', 'error');
    }
  };

  React.useEffect(() => {
    getPendingCompanies();
  }, []);

  const getAppliedJobs = async () => {
    try {
      const response = await 
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getAppliedJobs`, 
        { headers: { 'authorization': 'Bearer ' + token },
          params: { jobOffset, limit }
        });
      if (response.data.appliedJobs.length < 5) {
        updateMoreJobs(false);
      }

      updateJobs([
        ...jobs,
        ...response.data.appliedJobs
      ]);
      incrementJobOffset(jobOffset + 5);
      
    } catch (err) {
      console.log(err);
      toast('Unable to load jobs', 'error');
    }
  };

  React.useEffect(() => {
    getAppliedJobs();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.header}>Welcome Admin</Typography>
      <div className={classes.content}>

        <div className={classes.subcontent}>
          <Typography variant='h5' className={classes.subheader}>Profile Information:</Typography>
          <p> Login Email: {email} </p>
          <div className={classes.buttonDiv}> 
            <Button size="large" variant="contained" component={Link} to='/profile/password' className={classes.button}>
                Change Password
            </Button>
          </div>

        <div className={classes.subcontent}>
          <Typography variant='h5' className={classes.subheader}>Pending Companies: </Typography>
          <Typography variant='p'> Approved or Rejected companies will be removed upon page refresh</Typography>
          {(companies.length) > 0 &&
            <React.Fragment>
            <div className={classes.companyList}>
              <CompanyListing companies={companies} />
            </div>
            <div className={classNames(classes.buttonDiv, classes.center)}> 
              <Button size='large' variant='contained' className={classes.button} onClick={getPendingCompanies} disabled={!moreCompanies}>
                See More Pending Companies
              </Button>
              <Button size='large' variant='contained' className={classes.button} onClick={refreshCompanies}>
                Save Changes and Refresh
              </Button>
            </div>
            </React.Fragment>
          }
          {(companies.length) === 0 &&
            <Typography variant='p' className={classes.noResults}>There are no Pending Companies</Typography>
          }
          
        </div>
        
        <div className={classes.subcontent}>
          <Typography variant='h5' className={classes.subheader}> Recently Applied Jobs: </Typography>
          {(jobs.length) > 0 &&
            <React.Fragment>
            <div className={classes.jobList}>
              <JobListing jobs={jobs} />
            </div>
            <div className={classNames(classes.buttonDiv, classes.center)}> 
            <Button size='large' variant='contained' className={classes.button} onClick={getAppliedJobs} disabled={!moreJobs}>
              See More Applied Jobs
            </Button>
            </div>
            </React.Fragment>
          }
          {(jobs.length) === 0 &&
            <Typography variant='p' className={classes.noResults}>There are no Jobs with Applicants</Typography>
          }
          
        </div>

        </div>
      </div>
    </div>
  );
}

export default withRouter(Admin);
