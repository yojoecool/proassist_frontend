import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    registration: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },  
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
    radioField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
    button: {
        width: 200
    }
  }));

function Registration() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        name: '',
        password: '',
        email: '',
        identity: 'job_seeker',
    });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.registration}>
        <p>Registration for an Account!</p>
        <TextField
            required
            label="Name"
            id="name"
            className={classes.textField}
            value={state.name}
            onChange={handleChange('name')}
            margin="normal"
        />
        <FormHelperText>Required</FormHelperText>
        <TextField
            required
            label="Email"
            id="email"
            className={classes.textField}
            value={state.email}
            onChange={handleChange('email')}
            margin="normal"
        />
        <FormHelperText>Required</FormHelperText>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Who are you?</FormLabel>
            <RadioGroup
            name="identity"
            className={classes.radioField}
            value={state.identity}
            onChange={handleChange('identity')}
            >
            <FormControlLabel value="job_seeker" control={<Radio />} label="Job Seeker" />
            <FormControlLabel value="company" control={<Radio />} label="Company" />
            </RadioGroup>
      </FormControl>

        {/* <Button size="large" variant="contained" color="primary" className={classes.button}>
            Login with Facebook
        </Button> */}
        <Button size="large" variant="contained" color="primary" className={classes.button}>
            Sign Up
        </Button>

    </div>
  );
}

export default Registration;
