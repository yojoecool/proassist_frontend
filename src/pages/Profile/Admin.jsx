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
  center: {
    justifyContent: 'center'
  }
}));


function Admin(props) {
  const classes = useStyles();
  const { userId, email } = useToken();

  const [token] = useLocalStorage('proAssistToken');


  const [moreJobs, updateMoreJobs] = React.useState(true)
  const [jobs, updateJobs] = React.useState([]);
  const [offset, incrementOffset] = React.useState(0);
  const limit = 5;

  const getJobs = async () => {
    try {
      const response = await 
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/getJobs`, 
        { headers: { 'authorization': 'Bearer ' + token },
          params: { userId, offset, limit }
        });
      if (response.data.jobs.length < 5) {
        updateMoreJobs(false);
      }

      updateJobs([
        ...jobs,
        ...response.data.jobs
      ]);
      incrementOffset(offset + 5);
      
    } catch (err) {
      console.log(err);
      toast('Unable to load jobs', 'error');
    }
  };

  React.useEffect(() => {
    getJobs();
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
          <Typography variant='h5' className={classes.subheader}>Notifications: </Typography>
          <div className={classes.jobList}>
            <JobListing jobs={jobs} />
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default withRouter(Admin);
