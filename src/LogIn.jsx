import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, MenuItem, IconButton, Typography, TextField, Button
} from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 25,
    flexDirection: 'column'
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
    color: 'red'
  },
  errorHeight: {
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    }
    if (!password) {
      newErrors.password = true;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  };

  const update = (e, changeFunction) => {
    const { [e.target.name]: removed, ...newErrors } = errors;
    setErrors(newErrors);
    changeFunction(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.loginText}>Log In</Typography>

      <div className={classes.errorHeight}>
        <Typography variant="subtitle1" className={classes.errorText}>
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
        />

        <br /><br />
        <Button variant="contained" color="primary" className={classes.button} type="submit">
          Submit
        </Button>
      </form>

    </div>
  );
}

export default LogIn;
