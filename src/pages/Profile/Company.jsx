import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import { makeStyles } from '@material-ui/core/styles';
import { useToken } from '../../hooks';

import axios from 'axios';
import {
  Typography, TextField, Button
} from '@material-ui/core';
import { toast } from '../../modules';

const useStyles = makeStyles(theme => ({
  root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      flexDirection: 'column',
      marginTop: '10%',
      marginBottom: '3%',
  },
  rootOnForms: {
      marginTop: '3%',
  },
  registrationText: {
      color: theme.palette.secondary.main,
      fontWeight: 'bold'
  }
}));


function Company(props) {
  const classes = useStyles();
  const { userId, email } = useToken();

  const [token] = useLocalStorage('proAssistToken');
  //use states to cause rerender
  const [state, setState] = React.useState({
    companyName: '',
    companyStatus: '',

    firstName: '',
    lastName: '',
    phoneNumber: '',
    pocEmail: ''
  });

const handleChange = (name, event) => {
    setState({
    ...state,
    [name]: event.target.value,
    });
};

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await 
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/getProfile?user=${userId}`, 
        { headers: { 'authorization': 'Bearer ' + token }});
        console.log(response)
        setState({
          ...state,
          companyName: response.data.companyObject.companyName,
          companyStatus: response.data.companyObject.companyStatus,
          
          firstName: response.data.companyObject.poc.firstName,
          lastName: response.data.companyObject.poc.lastName,
          phoneNumber: response.data.companyObject.poc.phoneNumber,
          pocEmail: response.data.companyObject.poc.email
        })
        
        
      } catch (err) {
        toast('Unable to load profile', 'error');
      }
    };
    getProfile()
  }, []);

  let companyStatusMessage;

  if (state.companyStatus === 'Pending') {
    companyStatusMessage = 'Your profile is awaiting review by the Admin. You cannot post jobs at this time.'
  } else if (state.companyStatus === 'Rejected') {
    companyStatusMessage = 'Your profile has been blocked from posting jobs. Please reach out to the Admin.'
  } else if (state.companyStatus === 'Active') {
    companyStatusMessage = 'Your profile has been approved to post jobs.'
  } else {
    companyStatusMessage = '[Could not fetch profile details]'
  }

  return (
    <React.Fragment>
      <Typography variant='h4' className={classes.subheader}>Welcome {state.companyName}</Typography>
      <Typography variant='h5' className={classes.subheader}>Company Information:</Typography>
      <p> Company/Login Email: {email} </p>
      <p> Point of Contact: {state.firstName} {state.lastName} </p>
      <p> Point of Contact: {state.phoneNumber} </p>
      <p> Point of Contact: {state.pocEmail} </p>
      <Typography variant='h5' className={classes.subheader}>Company Status: {state.companyStatus}</Typography>
      <p> {companyStatusMessage} </p>
      <Typography variant='h5' className={classes.subheader}>Your Jobs: </Typography>

    </React.Fragment>
  );
}

export default Company;
