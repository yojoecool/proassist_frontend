import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography, 
  } from '@material-ui/core';


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
            onChange={props.handleChange('identity')}
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
function JobSeeker(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h5">Job Seeker Application:</Typography>
            <TextField
                required
                label="First Name"
                id="firstName"
                className={classes.formField}
                value={props.firstName}
                onChange={props.handleChange('firstName')}
                margin="normal"
            />
            <TextField
                required
                label="Last Name"
                id="lastName"
                className={classes.formField}
                value={props.lastName}
                onChange={props.handleChange('lastName')}
                margin="normal"
            />
            <TextField
                required
                label="Email"
                id="email"
                className={classes.formField}
                value={props.email}
                onChange={props.handleChange('email')}
                margin="normal"
            />
            <TextField
                required
                label="Password"
                id="password"
                className={classes.formField}
                value={props.password}
                onChange={props.handleChange('password')}
                margin="normal"
                type="password"
            />
            <TextField
                required
                label="Confirm Password"
                id="passwordCheck"
                className={classes.formField}
                value={props.passwordCheck}
                onChange={props.handleChange('passwordCheck')}
                margin="normal"
                type="password"
            />

            {/* <Button size="large" variant="contained" color="primary" className={classes.button}>
                Login with Facebook
            </Button> */}

            <div> 
                <Button size="large" variant="contained" color="primary-light" className={classes.button} onClick={props.changeView("back")}>
                    Back
                </Button>

                <Button size="large" variant="contained" color="primary" className={classes.button}>
                    Register
                </Button>
            </div>
        </div>
    )
}

function Company(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h5">Company Application:</Typography>
            <Typography variant="p" className={classes.subsection}>Company Information:</Typography>
            <TextField
                required
                label="Company Name"
                id="companyName"
                className={classes.formField}
                value={props.companyName}
                onChange={props.handleChange('companyName')}
                margin="normal"
            />
            <TextField
                required
                label="Email"
                id="email"
                className={classes.formField}
                value={props.email}
                onChange={props.handleChange('email')}
                margin="normal"
            />
            <TextField
                required
                label="Password"
                id="password"
                className={classes.formField}
                value={props.password}
                onChange={props.handleChange('password')}
                margin="normal"
                type="password"
            />
            <TextField
                required
                label="Confirm Password"
                id="passwordCheck"
                className={classes.formField}
                value={props.passwordCheck}
                onChange={props.handleChange('passwordCheck')}
                margin="normal"
                type="password"
            />
            <Typography variant="p" className={classes.subsection}>Point of Contact Information:</Typography>
            <TextField
                required
                label="First Name"
                id="firstName"
                className={classes.formField}
                value={props.firstName}
                onChange={props.handleChange('firstName')}
                margin="normal"
            />
            <TextField
                required
                label="Last Name"
                id="lastName"
                className={classes.formField}
                value={props.lastName}
                onChange={props.handleChange('lastName')}
                margin="normal"
            />
            <TextField
                required
                label="Phone Number"
                id="phoneNumber"
                className={classes.formField}
                value={props.phoneNumber}
                onChange={props.handleChange('phoneNumber')}
                margin="normal"
            />
            

            <div> 
                <Button size="large" variant="contained" color="primary-light" className={classes.button} onClick={props.changeView("back")}>
                    Back
                </Button>

                <Button size="large" variant="contained" color="primary" className={classes.button}>
                    Register
                </Button>
            </div>
        </div>
    )
}

// If user is already logged in, reroute to profile page?
function Registration() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '',
        password: '',
        passwordCheck: '',
        email: '',
        identity: 'jobSeeker',
        view: 'pickIdentity'
    });

    const handleChange = name => event => {
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

export default Registration;
