import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, TextField, Button
} from '@material-ui/core';
import toast from '../modules/toast';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    paddingBottom: 35,
    marginTop: '10%'
  },
  loginText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  },
  form: {
    width: '100%',
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    width: '100%'
  },
  errorHeight: {
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: '#2e7d32',
    color: 'white',
    '&:hover': {
      backgroundColor: '#005005',
      color: 'white'
    }
  },
  input: {
    width: 300
  }
}));

function LogIn(props) {
  const classes = useStyles();

  const [email, changeEmail] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [password, changePassword] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) {
      newErrors.email = true;
      newErrors.errorText = 'Missing Required Field(s)';
    }
    if (!password) {
      newErrors.password = true;
      newErrors.errorText = 'Missing Required Field(s)';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast('Errors on the page.', 'error');
      return;
    }

    try {
      const { REACT_APP_BACKEND_URL } = process.env;
      await axios.post(`${REACT_APP_BACKEND_URL}/users/login`, { email, password });
      toast('Login Successful!', 'success');
      props.history.replace('/profile');
    } catch (err) {
      if (err.response.status === 401) {
        toast('Invalid Login', 'error');
      } else {
        toast('Error logging in. Please try again later.', 'error');
      }
    }
  };

  const update = (e, changeFunction) => {
    const { [e.target.name]: removed, ...newErrors } = errors;
    setErrors({ ...newErrors, errorText: '' });
    changeFunction(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.loginText}>Log In</Typography>

      <div className={classes.errorHeight}>
        <Typography variant="subtitle1" className={classes.errorText}>
          {errors.errorText}
        </Typography>
      </div>

      <form className={classes.form} onSubmit={submit}>
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={e => update(e, changeEmail)}
          margin="normal"
          variant="outlined"
          type="email"
          autoComplete="email"
          error={errors.email}
          className={classes.input}
        />

        <br />
        <TextField
          label="Password"
          name="password"
          value={password}
          onChange={e => update(e, changePassword)}
          margin="normal"
          variant="outlined"
          type="password"
          error={errors.password}
          className={classes.input}
        />

        <br /><br />
        <Button variant="contained" className={classes.submitButton} type="submit">
          Submit
        </Button>
      </form>

    </div>
  );
}

export default withRouter(LogIn);
