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
  const { userType, email, userId } = useToken();
  const [token] = useLocalStorage('proAssistToken');
  const [errors, setErrors] = React.useState({ errorText: [] });

  const [state, setState] = React.useState({
    // All
    firstName: '',
    lastName:'',
    // Company
    pocPhoneNumber: '',
    email: '',
  });

  const handleChange = (name, event) => {
      setState({
      ...state,
      [name]: event.target.value,
      });
  };

  React.useEffect(() => {
    const getProfile = async (userType) => {
      try {
        if (userType === "Company") {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/companies/getProfile`, 
          { 
            headers: { 'authorization': 'Bearer ' + token },
            params: { userId }
          }
        );

        setState({
          firstName: response.data.companyObject.poc.firstName,
          lastName: response.data.companyObject.poc.lastName,
          phoneNumber: response.data.companyObject.poc.phoneNumber,
          email: response.data.companyObject.poc.email
        });
        } else {
        //   TODO: Add Call to set User/Admin edits like above 
        }
      } catch (err) {
        console.log(err)
        toast('Unable to load profile. Please try again later.', 'error');
        props.history.push('/profile');
      }
    };
    getProfile(userType);
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const {validateEmail, validatePhoneNumber} = validations;

    const newErrors = {errorText:[]};
    if (state.email && !validateEmail(state.email)) {
        newErrors.email = true;
        newErrors.errorText = [...newErrors.errorText, 'Invalid Email'];
    }
    if (state.phoneNumber && !validatePhoneNumber(state.phoneNumber)) {
        newErrors.phoneNumber = true;
        newErrors.errorText = [...newErrors.errorText, 'Invalid Phone Number'];
      }

    setErrors(newErrors);
    if (newErrors.errorText.length > 0) {
      toast('Errors on the page.', "error");
      return;
    }
    try {
      const { REACT_APP_BACKEND_URL } = process.env;
      if (userType === 'Company') {
      await axios.put(
            `${REACT_APP_BACKEND_URL}/companies/updatePOC`, 
            { 
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email, 
                phoneNumber: state.phoneNumber,
            },
            {
              headers: { 'authorization': 'Bearer ' + token },
              params: { userId }
            }
        );
      } else {
        //TODO Hit Update for other entities
      }
      toast('Edit Successful!', 'success');
      props.history.push('/profile');
    } catch (err) {
    if (err.response && err.response.status === 404) {
        toast('User not found.', 'error');
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
      <Typography variant="h5">Edit Profile</Typography>

      {userType === "Company" &&
      <Typography variant='h5' className={classes.subheader}>Point Of Contact Information:</Typography>
      }

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
          label="First Name"
          name="firstName"
          className={classes.formField}
          value={state.firstName}
          onChange={(e) => {update(e); handleChange('firstName', e)}}
          margin="normal"
          error={errors.firstName}
      />
      <TextField
          required
          label="Last Name"
          name="lastName"
          className={classes.formField}
          value={state.lastName}
          onChange={(e) => {update(e); handleChange('lastName', e)}}
          margin="normal"
          error={errors.lastName}
      />
      <TextField
          required
          label="Email"
          name="email"
          className={classes.formField}
          value={state.email}
          onChange={(e) => {update(e); handleChange('email', e)}}
          type="email"
          autoComplete="email"
          margin="normal"
          error={errors.email}
      />
      <TextField
        required
        label="Phone Number"
        name="phoneNumber"
        className={classes.formField}
        value={state.phoneNumber}
        onChange={(e) => {update(e); handleChange('phoneNumber', e)}}
        margin="normal"
        InputProps={{
            inputComponent: PhoneNumberFormat,
        }}
        error={errors.phoneNumber}
      />
            

      <div className={classes.buttonDiv}> 
          <Button size="large" variant="contained" component={Link} to="/profile" className={classes.button}>
              Back
          </Button>

          <Button size="large" variant="contained" color="primary" className={classes.button} type="submit">
              Submit Changes
          </Button>
      </div>
      <div className={classes.buttonDiv}> 
        <Button size="large" variant="contained" color="secondary" className={classes.button}>
            Deactivate Account
        </Button>
      </div>
      </form>
  </div>
  );
}

export default withRouter(EditProfile);
