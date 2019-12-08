import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, TextField, Button, CircularProgress
} from '@material-ui/core';
import { toast, decodeToken } from '../modules';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    marginTop: "10%",
    marginBottom: "10%"
  },
  loginText: {
    color: theme.palette.secondary.main,
    fontWeight: "bold"
  },
  form: {
    width: "100%",
    textAlign: "center"
  },
  errorText: {
    color: "red",
    marginTop: 10,
    width: "100%"
  },
  errorHeight: {
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  buttonWrapper: {
    position: "relative",
    marginBottom: 15
  },
  submitButton: {
    backgroundColor: "#2e7d32",
    color: "white",
    "&:hover": {
      backgroundColor: "#005005",
      color: "white"
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
  const [loading, setLoad] = React.useState(false);

  const [token, setToken] = useLocalStorage('proAssistToken');

  React.useEffect(() => {
    if (!!decodeToken()) {
      props.history.replace('/profile');
    }
  }, [token, props.history]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { REACT_APP_BACKEND_URL } = process.env;
      setLoad(true);
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/users/login`, { email, password });
      const token = response.data.token;

      toast('Login Successful!', 'success');
      setToken(token);
    } catch (err) {
      if (err.response.status === 401) {
        toast('Invalid Login', 'error');
        setErrors({ password: true, email: true, errorText: 'Invalid email or password.' });
      } else {
        toast('Error logging in. Please try again later.', 'error');
      }
      setLoad(false);
    }
  };

  const update = (e, changeFunction) => {
    const { [e.target.name]: removed, ...newErrors } = errors;
    setErrors({ ...newErrors, errorText: '' });
    changeFunction(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.loginText}>
        Log In
      </Typography>

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
          required
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
          required
        />

        <br />
        <br />
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            type="submit"
            className={classNames(classes.submitButton)}
            color="primary"
            disabled={loading}
          >
            Submit
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </form>
    </div>
  );
}

export default withRouter(LogIn);
