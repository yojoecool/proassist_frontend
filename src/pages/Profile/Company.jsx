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
  const { userId } = useToken();

  const [token] = useLocalStorage('proAssistToken');
  //use states to cause rerender
  const [state, setState] = React.useState({
    companyName: '',
    email: '',
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
        
        setState({
          ...state,
          companyName: response.data.companyObject.companyName,
          email: response.data.companyObject.email,
          companyStatus: response.data.companyObject.companyStatus,
          
          firstName: response.data.companyObject.poc.firstName,
          lastName: response.data.companyObject.poc.lastName,
          phoneNumber: response.data.companyObject.poc.phoneNumber,
          pocEmail: response.data.companyObject.poc.pocEmail
        })
        
        
      } catch (err) {
        toast('Unable to load profile', 'error');
      }
    };
    getProfile()
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.header}>Welcome {state.companyName}</Typography>
    </React.Fragment>
  );
}

export default Company;
