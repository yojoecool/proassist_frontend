import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';
import {
  Typography, Button, CircularProgress
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useToken } from '../../hooks';
import { toast } from '../../modules';
import { JobListing } from '../company';

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
  buttonProgress: {
    color: theme.palette.secondary.main,
  },
  center: {
    justifyContent: 'center'
  }
}));


function Company(props) {
  const classes = useStyles();
  const { userId, email } = useToken();

  const [token] = useLocalStorage('proAssistToken');
  const [userInfo, setUserState] = React.useState({
    companyName: '',
    companyStatus: '',

    firstName: '',
    lastName: '',
    phoneNumber: '',
    pocEmail: ''
  });

  const [moreJobs, updateMoreJobs] = React.useState(true)
  const [jobs, updateJobs] = React.useState([]);
  const [offset, incrementOffset] = React.useState(0);
  const limit = 5;

  const [profileLoading, setPLoading] = React.useState(false);
  const [jobLoading, setJLoading] = React.useState(false);

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        setPLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/companies/getProfile`, 
          { 
            headers: { 'authorization': 'Bearer ' + token },
            params: { userId }
          }
        );

        setUserState({
          companyName: response.data.companyObject.companyName || '',
          companyStatus: response.data.companyObject.companyStatus || '',
          
          firstName: response.data.companyObject.poc.firstName || '',
          lastName: response.data.companyObject.poc.lastName || '',
          phoneNumber: response.data.companyObject.poc.phoneNumber || '',
          pocEmail: response.data.companyObject.poc.email || ''
        });
        
      } catch (err) {
        console.log(err)
        toast('Unable to load profile', 'error');
      } finally {
        setPLoading(false);
      }
    };
    getProfile();
  }, [userId, token]);

  React.useEffect(() => {
    const getJobs = async () => {
      try {
        setJLoading(true);
        const response = await
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/getJobs`,
            {
              headers: { 'authorization': 'Bearer ' + token },
              params: { userId, offset, limit }
            });
        if (response.data.jobs.length < limit) {
          updateMoreJobs(currMoreJobs => !currMoreJobs);
        }

        updateJobs(currJobs => [
          ...currJobs,
          ...response.data.jobs
        ]);

      } catch (err) {
        console.log(err);
        toast('Unable to load jobs', 'error');
      } finally {
        setJLoading(false);
      }
    };

    getJobs();
  }, [token, userId, limit, offset]);

  let companyStatusMessage;
  if (userInfo.companyStatus === 'Pending') {
    companyStatusMessage = 'Your profile is awaiting review by the Admin. You cannot post jobs at this time.'
  } else if (userInfo.companyStatus === 'Rejected') {
    companyStatusMessage = 'Your profile has been blocked from posting jobs. Please reach out to the Admin.'
  } else if (userInfo.companyStatus === 'Active') {
    companyStatusMessage = 'Your profile has been approved to post jobs.'
  } else if (profileLoading) {
    companyStatusMessage = 'Loading...'
  } else {
    companyStatusMessage = '[Could not fetch profile details]'
  }

  const loadingCircle = (isLoading) => {
    if (isLoading) {
      return (<CircularProgress size={24} className={classes.buttonProgress} />)
    } else {
      return <React.Fragment/>
    }
  }
  const loadingText = (isLoading) => {
    if (isLoading) {
      return (<React.Fragment> Loading... </React.Fragment>)
    } else {
      return <React.Fragment/>
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.header}>Welcome {userInfo.companyName} {loadingCircle(profileLoading)} </Typography>
      <div className={classes.content}>

        <div className={classes.subcontent}>
          <Typography variant='h5' className={classes.subheader}>Profile Information:</Typography>
          <p> Company/Login Email: {email} </p>
          <div className={classes.buttonDiv}> 
            <Button size="large" variant="contained" component={Link} to='/profile/password' className={classes.button} disabled={profileLoading}>
                Change Password
            </Button>
          </div>

          <Typography variant='h5' className={classes.subheader}>Point of Contact Information: {loadingCircle(profileLoading)} </Typography>
          <p> Name: {userInfo.firstName} {userInfo.lastName} {loadingText(profileLoading)} </p>
          <p> Email: {userInfo.pocEmail} {loadingText(profileLoading)} </p>
          <p> Phone Number: {userInfo.phoneNumber} {loadingText(profileLoading)}</p>
          <div className={classes.buttonDiv}> 
            <Button size='large' variant='contained' component={Link} to='/profile/edit' className={classes.button} disabled={profileLoading}>
                Edit Profile
            </Button>
          </div>

          <Typography variant='h5' className={classes.subheader}>Company Status: {userInfo.companyStatus} {loadingCircle(profileLoading)}</Typography>
          <p> {companyStatusMessage} </p>

        </div>

        <div className={classes.subcontent}>
          <Typography variant='h5' className={classes.subheader}>Your Jobs: {loadingCircle(jobLoading)} </Typography>
          <div className={classes.jobList}>
            <JobListing jobs={jobs} />
            {loadingText(jobLoading)}
          </div>
          
          <div className={classNames(classes.buttonDiv, classes.center)}> 
            <Button
              size='large'
              variant='contained'
              className={classes.button}
              onClick={() => incrementOffset(currOffset => currOffset + limit)}
              disabled={!moreJobs || jobLoading}
            >
              See More Jobs
            </Button>
            <Button size='large' variant='contained' color='primary' component={Link} to='/profile/addjob' 
              className={classes.button} disabled={userInfo.companyStatus!=='Active' || jobLoading}>
            Add New Job
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default withRouter(Company);
