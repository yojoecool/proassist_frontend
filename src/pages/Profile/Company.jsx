import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';
import {
  Typography, TextField, Button
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useToken } from '../../hooks';
import { toast } from '../../modules';

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
    justifyContent: 'space-around',
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
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')] : {
      width: '80%',
    },
  },
  subheader: {
    marginBotton: '4%'
  },
  button: {
    width: '80%',
    margin: 12,
    '&:hover': {
        color: theme.palette.blue.light
    }
  },
  buttonDiv: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingTop: 20
  },
}));


function Company(props) {
  const classes = useStyles();
  const { userId, email } = useToken();

  const [token] = useLocalStorage('proAssistToken');
  //use states to cause rerender
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
  let offset = 0;
  const getJobs = async (offset) => {
    try {
      const response = await 
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/getJobs`, 
      { headers: { 'authorization': 'Bearer ' + token },
        params: { userId, offset }
      });
      
      if (response.data.jobs.length < 10) {
        updateMoreJobs(false);
        return;
      }

      updateJobs([
        ...jobs,
        ...response.data.jobs
      ])
      offset += 10;
      
    } catch (err) {
      console.log(err);
      toast('Unable to load jobs', 'error');
    }
  };

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/companies/getProfile`, 
          { 
            headers: { 'authorization': 'Bearer ' + token },
            params: { userId }
          }
        );

        setUserState({
          companyName: response.data.companyObject.companyName,
          companyStatus: response.data.companyObject.companyStatus,
          
          firstName: response.data.companyObject.poc.firstName,
          lastName: response.data.companyObject.poc.lastName,
          phoneNumber: response.data.companyObject.poc.phoneNumber,
          pocEmail: response.data.companyObject.poc.email
        });
        
      } catch (err) {
        console.log(err)
        toast('Unable to load profile', 'error');
      }
    };
    getProfile();
  }, []);

  React.useEffect(() => {
    getJobs(offset);
  }, []);

  let companyStatusMessage;
  if (userInfo.companyStatus === 'Pending') {
    companyStatusMessage = 'Your profile is awaiting review by the Admin. You cannot post jobs at this time.'
  } else if (userInfo.companyStatus === 'Rejected') {
    companyStatusMessage = 'Your profile has been blocked from posting jobs. Please reach out to the Admin.'
  } else if (userInfo.companyStatus === 'Active') {
    companyStatusMessage = 'Your profile has been approved to post jobs.'
  } else {
    companyStatusMessage = '[Could not fetch profile details]'
  }

  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.header}>Welcome {userInfo.companyName}</Typography>
      <div className={classes.content}>
        <div className={classes.subcontent}>
          <Typography variant='h5' className={classes.subheader}>Profile Information:</Typography>
          <p> Company/Login Email: {email} </p>

          <Typography variant='h5' className={classes.subheader}>Point of Contact Information:</Typography>
          <p> Name: {userInfo.firstName} {userInfo.lastName} </p>
          <p> Phone Number: {userInfo.phoneNumber} </p>
          <p> Email: {userInfo.pocEmail} </p>
          <div className={classes.buttonDiv}> 
            <Button size='large' variant='contained' className={classes.button}>
                Edit
            </Button>

            <Button size='large' variant='contained' color='secondary' className={classes.button}>
                Deactivate
            </Button>
          </div>
        </div>
        <div className={classes.subcontent}>
          <Typography variant='h5' className={classes.subheader}>Company Status: {userInfo.companyStatus}</Typography>
          <p> {companyStatusMessage} </p>
          <Typography variant='h5' className={classes.subheader}>Your Jobs: </Typography>
          <div className={classes.buttonDiv}> 
            <Button size='large' variant='contained' className={classes.button} onClick={getJobs} disabled={!moreJobs}>
              See More Jobs
            </Button>
            <Button size='large' variant='contained' color='primary' component={Link} to='/profile/addjob' 
              className={classes.button} disabled={userInfo.companyStatus!=='Active'}>
            Add New Job
            </Button>
          </div>
          </div>
        </div>
    </div>
  );
}

export default withRouter(Company);
