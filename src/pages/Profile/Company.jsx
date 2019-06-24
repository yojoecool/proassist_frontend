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
  button: {
    width: 150,
    margin: 25,
    '&:hover': {
        color: theme.palette.blue.light
    },
    [theme.breakpoints.down('sm')] : {
        width: "80%",
        margin: 12
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

  // const handleChange = (name, event) => {
  //     setState({
  //     ...state,
  //     [name]: event.target.value,
  //     });
  // };

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/companies/getProfile`, 
          { headers: { 'authorization': 'Bearer ' + token },
            params: { userId }
          }
        );

        console.log(response) //TODO REMOVE
        console.log(response.data.companyObject.companyName)
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
    const getJobs = async (offset) => {
      try {
        const response = await 
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/getJobs`, 
        { headers: { 'authorization': 'Bearer ' + token },
          params: { userId, offset }
        });
        console.log(response) //TODO REMOVE

        if (response.data.jobs.length === 0) {
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
      <Typography variant='profile' className={classes.header}>Welcome {userInfo.companyName}</Typography>
      <div className={classes.profile}>
        <Typography variant='h5' className={classes.subheader}>Profile Information:</Typography>
        <p> Company/Login Email: {email} </p>
        <p> Point of Contact: {userInfo.firstName} {userInfo.lastName} </p>
        <p> Point of Contact: {userInfo.phoneNumber} </p>
        <p> Point of Contact: {userInfo.pocEmail} </p>
        <Typography variant='h5' className={classes.subheader}>Company Status: {userInfo.companyStatus}</Typography>
        <p> {companyStatusMessage} </p>
        <div className={classes.buttonDiv}> 
          <Button size="large" variant="contained" className={classes.button}>
              Edit
          </Button>

          <Button size="large" variant="contained" color="secondary" className={classes.button}>
              Deactivate
          </Button>
        </div>
      </div>
      <Typography variant='h5' className={classes.subheader}>Your Jobs: {jobs} </Typography>
      <div className={classes.buttonDiv}> 
        <Button size="large" variant="contained" className={classes.button} disabled={!moreJobs}>
          See More Jobs
        </Button>
        <Button size="large" variant="contained" color="primary" component={Link} to="/profile/addjob"  className={classes.button}>
        Add New Job
        </Button>
      </div>
    </div>
  );
}

export default withRouter(Company);
