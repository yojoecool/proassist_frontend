import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';
import {
  Typography, Button, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { useToken } from '../../hooks';
import { toast, validations } from '../../modules';


const useStyles = makeStyles(theme => ({
  root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: '5%',
      flexDirection: 'column',
      [theme.breakpoints.up('sm')] : {
          marginTop: 25
      }
  },
  formField: {
      width: 450,
      [theme.breakpoints.down('sm')] : {
          width: '80%'
      }
  },
  button: {
      '&:hover': {
          color: theme.palette.blue.light
      },
      width: 150,
      margin: 25,
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
  errorText: {
      color: 'red',
      width: '100%',
      textAlign: 'center'
  },
  errorHeight: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap'
  },
}));

function EditPassword(props) {
  const classes = useStyles();
  const { userType, userId } = useToken();
  const [token] = useLocalStorage('proAssistToken');
  const [errors, setErrors] = React.useState({ errorText: [] });

  const [state, setState] = React.useState({
    currentPassword: '',
    password: '',
    passwordCheck: ''
  });

  const handleChange = (name, event) => {
      setState({
      ...state,
      [name]: event.target.value,
      });
  };

  const submit = async (e) => {
    e.preventDefault();

    const {validatePassword} = validations;

    const newErrors = {errorText:[]};

    if (state.password && !validatePassword(state.password, state.passwordCheck)) {
        newErrors.password = true;
        newErrors.errorText = [...newErrors.errorText, 'Passwords do not match'];
    }

    setErrors(newErrors);
    if (newErrors.errorText.length > 0) {
      toast('Errors on the page.', "error");
      return;
    }
    try {
      const { REACT_APP_BACKEND_URL } = process.env;
      await axios.put(
            `${REACT_APP_BACKEND_URL}/users/updatePassword`, 
            { 
                currentPassword: state.currentPassword,
                password: state.password
            },
            {
              headers: { 'authorization': 'Bearer ' + token },
              params: { userId }
            }
        );
      toast('Edit Successful!', 'success');
      props.history.push('/profile');
    } catch (err) {
    if (err.response && err.response.status === 404) {
        toast('User not found.', 'error');
    } else if (err.response && err.response.status === 403) {
        toast('Current password is invalid.', 'error');
        setErrors({currentPassword: true, errorText: []});
    } else {
        toast('Error submitting changes. Please try again later.', 'error');
    }
    }
};

const update = (e) => {
    const { [e.target.name]: removed, ...newErrors } = errors;
    setErrors({ ...newErrors, errorText: [] });
};
  return (
    <div className={classes.root}>
      <Typography variant="h5">Change Password</Typography>

      <div className={classes.errorHeight}>
          {errors.errorText.map(err => {
          return (
              <Typography variant="subtitle1" className={classes.errorText}>
                  {err}
              </Typography>
          )
          })}
      </div>

      <form className={classes.root} onSubmit={submit}>
      <TextField
            required
            label="Current Password"
            name="currentPassword"
            className={classes.formField}
            value={state.currentPassword}
            onChange={(e) => {update(e); handleChange('currentPassword', e)}}
            margin="normal"
            type="password"
            error={errors.currentPassword}
        />
      <TextField
            required
            label="New Password"
            name="password"
            className={classes.formField}
            value={state.password}
            onChange={(e) => {update(e); handleChange('password', e)}}
            margin="normal"
            type="password"
            error={errors.password}
        />
        <TextField
            required
            label="Confirm New Password"
            name="passwordCheck"
            className={classes.formField}
            value={state.passwordCheck}
            onChange={(e) => {update(e); handleChange('passwordCheck', e)}}
            margin="normal"
            type="password"
            error={errors.password}
        />
            
      <div className={classes.buttonDiv}> 
          <Button size="large" variant="contained" component={Link} to="/profile" className={classes.button}>
              Back
          </Button>

          <Button size="large" variant="contained" color="primary" className={classes.button} type="submit">
              Submit
          </Button>
      </div>
      </form>
  </div>
  );
}

export default withRouter(EditPassword);
