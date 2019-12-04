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
import { UserInfo } from '../../components';
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


function Company(props) {
  const classes = useStyles();
  const { userId, name, companyStatus } = useToken();

  const [token] = useLocalStorage('proAssistToken');

  const [moreJobs, updateMoreJobs] = React.useState(true);
  const [jobs, updateJobs] = React.useState([]);
  const [offset, incrementOffset] = React.useState(0);
  const limit = 5;

  React.useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/getJobs`,
            {
              headers: { 'authorization': 'Bearer ' + token },
              params: { userId, offset, limit }
            });
        if (response.data.jobs.length < 5) {
          updateMoreJobs(currMoreJobs => !currMoreJobs);
        }

        updateJobs(currJobs => [
          ...currJobs,
          ...response.data.jobs
        ]);

      } catch (err) {
        console.log(err);
        toast('Unable to load jobs', 'error');
      }
    };

    getJobs();
  }, [token, userId, limit, offset]);

  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.header}>Welcome {name}</Typography>
      <div className={classes.content}>
        <div className={classes.subcontent}>
          <UserInfo />
        </div>

        <div className={classes.subcontent}>
          <Typography variant='h5' className={classes.subheader}>Your Jobs: </Typography>
          <div className={classes.jobList}>
            <JobListing jobs={jobs} />
          </div>
          
          <div className={classNames(classes.buttonDiv, classes.center)}> 
            <Button
              size='large'
              variant='contained'
              className={classes.button}
              onClick={() => incrementOffset(currOffset => currOffset + 5)}
              disabled={!moreJobs}
            >
              See More Jobs
            </Button>
            <Button size='large' variant='contained' color='primary' component={Link} to='/profile/addjob' 
              className={classes.button} disabled={companyStatus !== 'Active'}>
              Add New Job
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default withRouter(Company);
