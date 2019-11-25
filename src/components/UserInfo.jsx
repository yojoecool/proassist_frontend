import React from 'react';
import axios from 'axios';
import {
  Typography, Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useLocalStorage from 'react-use-localstorage';
import { useToken } from '../hooks';
import { toast } from '../modules';


const useStyles = makeStyles(theme => ({
  button: {
    width: 215,
    margin: 25,
    '&:hover': {
      color: theme.palette.blue.light
    },
    [theme.breakpoints.down('md')]: {
      width: '80%',
      margin: 20,
    },
  }
}));

function UserInfo(props) {
  const classes = useStyles();
  const { userType, userId, email, companyStatus } = useToken();
  const [token] = useLocalStorage('proAssistToken');

  const [userData, setUserData] = React.useState({ });

  React.useEffect(() => {
    const getUserInfo = async () => {
      const { REACT_APP_BACKEND_URL } = process.env;
      const propsUserId = props.userId;

      let user = userId;
      if (propsUserId) {
        user = propsUserId;
      }

      try {
        const { data } = await axios.get(
          `${REACT_APP_BACKEND_URL}/users/userInfo`,
          {
            params: { user },
            headers: { authorization: `Bearer ${token}` }
          }
        );

        setUserData(data);
      } catch (err) {
        if (err.response.status === 404) {
          toast('User not found', 'error');
          return;
        } else if (err.response.status === 403) {
          toast('You are not authorized to view this user\'s info', 'error');
          return;
        }

        toast('Error loading user', 'error');
      }
    };

    getUserInfo();
  }, [props.userId, userId, token]);

  let normalUserDiv = '';
  switch (userType) {
    case 'Admin':
      break;
    case 'JobSeeker':
      break;
    case 'Company':
      let companyStatusMessage;
      if (userData.companyStatus === 'Pending') {
        companyStatusMessage = 'Your profile is awaiting review by the Admin. You cannot post jobs at this time.'
      } else if (userData.companyStatus === 'Rejected') {
        companyStatusMessage = 'Your profile has been blocked from posting jobs. Please reach out to the Admin.'
      } else if (userData.companyStatus === 'Active') {
        companyStatusMessage = 'Your profile has been approved to post jobs.'
      } else {
        companyStatusMessage = '[Could not fetch profile details]'
      }
      normalUserDiv = (
        <>
          {
            userData.poc && (
              <>
                <Typography variant='h5' className={classes.subheader}>Point of Contact Information:</Typography>
                <p> Name: {userData.poc.firstName} {userData.poc.lastName} </p>
                <p> Email: {userData.poc.email} </p>
                <p> Phone Number: {userData.poc.phoneNumber} </p>
                <div className={classes.buttonDiv}>
                  <Button size='large' variant='contained' component={Link} to='/profile/edit' className={classes.button}>
                    Edit Profile
                  </Button>
                </div>
              </>
            )
          }

          <Typography variant='h5' className={classes.subheader}>Company Status: {companyStatus}</Typography>
          <p> {companyStatusMessage} </p>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <>
      <Typography variant='h5' className={classes.subheader}>Profile Information:</Typography>
      <p>Login Email: {email}</p>
      <div className={classes.buttonDiv}>
        <Button size="large" variant="contained" component={Link} to='/profile/password' className={classes.button}>
          Change Password
        </Button>
      </div>
      {normalUserDiv}
    </>
  );
}

export default UserInfo;
