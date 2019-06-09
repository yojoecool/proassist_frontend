import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {
    Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, 
  } from '@material-ui/core';
import { JobSeeker, Company } from './registration';

// TODO: fix routing so if you are on job seeker or company registration, back button will go back to PickIdentity
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
    registrationText: {
        color: theme.palette.secondary.main,
        fontWeight: 'bold'
    },
    formControl: {
        minWidth: 120,
    },  
    formField: {
        width: 400,
    },
    button: {
        width: 150,
        margin: 25,
    },
    subsection: {
        marginTop: 35,
        fontWeight: 'bold'
    }
  }));

function PickIdentity(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
         <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Who are you?</FormLabel>
            <RadioGroup
            name="identity"
            className={classes.formField}
            value={props.identity}
            onChange={(e) => props.handleChange('identity', e)}
            >
            <FormControlLabel value="jobSeeker" control={<Radio />} label="Job Seeker" />
            <FormControlLabel value="company" control={<Radio />} label="Company" />
            </RadioGroup>
        </FormControl>

        <Button size="large" variant="contained" color="primary" className={classes.button} onClick={props.changeView()}>
            Continue
        </Button>
        </div>
    )
}

// If user is already logged in, reroute to profile page?
function Register() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '(  )    -    ',
        password: '',
        passwordCheck: '',
        email: '',
        identity: 'jobSeeker',
        view: 'pickIdentity'
    });

    const handleChange = (name, event) => {
        setState({
        ...state,
        [name]: event.target.value,
        });
        console.log(name)
        console.log(event.target.value)
    };
    
    let view;

    const changeView = (key) => () => {
        if (key === "back"){
            setState({
                ...state,
                view: 'pickIdentity'
            })
        } else {
            setState({
                ...state,
                view: state.identity
            })
        }
    }

    if (state.view === "company"){
        view = <Company 
            firstName={state.firstName} 
            lastName={state.lastName} 
            password={state.password}
            passwordCheck={state.passwordCheck} 
            companyName={state.companyName} 
            email={state.email} 
            handleChange={handleChange} 
            changeView={changeView}
            />
    } else if (state.view === "jobSeeker"){
        view = <JobSeeker 
            firstName={state.firstName} 
            lastName={state.lastName} 
            password={state.password} 
            passwordCheck={state.passwordCheck} 
            email={state.email} 
            handleChange={handleChange} 
            changeView={changeView}
            />
    } else {
        view = <PickIdentity 
            identity={state.identity} 
            handleChange={handleChange} 
            changeView={changeView}
            />
    }

    return (
        <div className={classes.root}>
            <Typography variant="h4" className={classes.registrationText}>Registration</Typography>
            {view}
        </div>
    );
}

export default withRouter(Register);
