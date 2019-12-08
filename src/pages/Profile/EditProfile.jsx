import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import classNames from 'classnames';
import axios from 'axios';
import {
  Typography, Button, TextField, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { useToken } from '../../hooks';
import { toast, validations } from '../../modules';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "5%",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      marginTop: 25
    }
  },
  formField: {
    width: 450,
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    }
  },
  button: {
    width: 215,
    margin: 25,
  },
  submitButton: {
    backgroundColor: theme.palette.blue.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.blue.dark,
      color: "white"
    }
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
  buttonDiv: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 20
  },
  errorText: {
    color: "red",
    width: "100%",
    textAlign: "center"
  },
  errorHeight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  }
}));

function PhoneNumberFormat(props) {
  const { inputRef, ...other } = props;

  return (
      <MaskedInput
      {...other}
      ref={ref => {
          inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
  );
}
PhoneNumberFormat.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


function EditProfile(props) {
  const classes = useStyles();
  const { userType, userId } = useToken();
  const [token] = useLocalStorage('proAssistToken');
  const { REACT_APP_BACKEND_URL: backend } = process.env;

  const [errors, setErrors] = React.useState({ errorText: [] });
  const [loading, setLoad] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const getProfile = async () => {
      setLoad(true);
      try {
        const response = await axios.get(
          `${backend}/users/userInfo`,
          {
            headers: { 'authorization': 'Bearer ' + token },
            params: { userId }
          }  
        );

        const { firstName: resFirst, lastName: resLast, email: resEmail } = response.data;
        setFirstName(resFirst);
        setLastName(resLast);
        setEmail(resEmail);
      } catch (err) {
        console.log(err)
        toast('Unable to load profile. Please try again later.', 'error');
      }
      setLoad(false);
    };
    getProfile(userType);
  }, [props.history, userType, userId, token, backend]);

  const submit = async (e) => {
    e.preventDefault();

    const { validateEmail } = validations;

    const newErrors = {errorText:[]};
    if (email && !validateEmail(email)) {
        newErrors.email = true;
        newErrors.errorText = [...newErrors.errorText, 'Invalid Email'];
    }

    setErrors(newErrors);
    if (newErrors.errorText.length > 0) {
      toast('Errors on the page.', "error");
      return;
    }

    setLoad(true);
    try {
        await axios.post(`${backend}/users/updateProfile`,
        { firstName, lastName, userType, email, userId },
        { headers: { authorization: "Bearer " + token } });
      toast('Edit Successful!', 'success');
      props.history.replace('/profile');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast('User not found.', 'error');
      } else {
        toast('Error submitting changes. Please try again later.', 'error');
      }
      setLoad(false);
    }
  };

  const update = (e) => {
      const { [e.target.name]: removed, ...newErrors } = errors;
      setErrors({ ...newErrors, errorText: [] });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Edit Profile</Typography>

      <div className={classes.errorHeight}>
        {errors.errorText.map(err => {
          return (
            <Typography variant="subtitle1" className={classes.errorText}>
              {err}
            </Typography>
          );
        })}
      </div>

      <form className={classes.root} onSubmit={submit}>
        <TextField
          required
          label="First Name"
          name="firstName"
          className={classes.formField}
          value={firstName}
          onChange={e => {
            update(e);
            setFirstName(e.target.value);
          }}
          disabled
          margin="normal"
          error={errors.firstName}
        />
        <TextField
          required
          label="Last Name"
          name="lastName"
          className={classes.formField}
          value={lastName}
          onChange={e => {
            update(e);
            setLastName(e.target.value);
          }}
          disabled
          margin="normal"
          error={errors.lastName}
        />
        <TextField
          required
          label="Email"
          name="email"
          className={classes.formField}
          value={email}
          onChange={e => {
            update(e);
            setEmail(e.target.value);
          }}
          type="email"
          autoComplete="email"
          margin="normal"
          error={errors.email}
        />
        {/* <TextField
          required
          label="Phone Number"
          name="phoneNumber"
          className={classes.formField}
          value={state.phoneNumber}
          onChange={e => {
            update(e);
            handleChange("phoneNumber", e);
          }}
          margin="normal"
          InputProps={{
            inputComponent: PhoneNumberFormat
          }}
          error={errors.phoneNumber}
        /> */}

        <div className="row">
          <div
            className={classNames(
              classes.buttonWrapper,
              "col-sm",
              "d-flex",
              "justify-content-center"
            )}
          >
            <Button
              variant="contained"
              onClick={props.history.goBack}
              className={classes.button}
            >
              Back
            </Button>
          </div>
          <div
            className={classNames(
              classes.buttonWrapper,
              "col-sm",
              "d-flex",
              "justify-content-center"
            )}
          >
            <Button
              variant="contained"
              className={classNames(classes.button, classes.submitButton)}
              disabled={loading}
              color="primary"
              type="submit"
            >
              Submit
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default withRouter(EditProfile);
