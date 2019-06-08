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

function PickIdentity(props) {
    const classes = useStyles();
    return (
        <div>
         <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Who are you?</FormLabel>
            <RadioGroup
            name="identity"
            className={classes.radioField}
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
        <div>
            <h2>Job Seeker Application:</h2>
            <TextField
                required
                label="Name"
                id="name"
                className={classes.textField}
                value={props.name}
                onChange={props.handleChange('name')}
                margin="normal"
            />
            <FormHelperText>Required</FormHelperText>
            <TextField
                required
                label="Email"
                id="email"
                className={classes.textField}
                value={props.email}
                onChange={props.handleChange('email')}
                margin="normal"
            />
            <FormHelperText>Required</FormHelperText>

            <Button size="large" variant="contained" color="primary" className={classes.button} onClick={props.changeView("back")}>
                Back
            </Button>

            {/* <Button size="large" variant="contained" color="primary" className={classes.button}>
                Login with Facebook
            </Button> */}

            <Button size="large" variant="contained" color="primary" className={classes.button}>
                Register
            </Button>
        </div>
    )
}

function Company(props) {
    const classes = useStyles();
    return (
        <div>
            <h2>Company Application:</h2>
            <TextField
                required
                label="Name"
                id="name"
                className={classes.textField}
                value={props.name}
                onChange={props.handleChange('name')}
                margin="normal"
            />
            <FormHelperText>Required</FormHelperText>
            <TextField
                required
                label="Email"
                id="email"
                className={classes.textField}
                value={props.email}
                onChange={props.handleChange('email')}
                margin="normal"
            />
            <FormHelperText>Required</FormHelperText>

            <Button size="large" variant="contained" color="primary" className={classes.button} onClick={props.changeView("back")}>
                Back
            </Button>

            <Button size="large" variant="contained" color="primary" className={classes.button}>
                Register
            </Button>
        </div>
    )
}

// If user is already logged in, reroute to profile page?
function Registration() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        name: '',
        password: '',
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
        view = <Company name={state.name} password={state.password} email={state.email} handleChange={handleChange} changeView={changeView}/>
    } else if (state.view === "jobSeeker"){
        view = <JobSeeker name={state.name} password={state.password} email={state.email} handleChange={handleChange} changeView={changeView}/>
    } else {
        view = <PickIdentity identity={state.identity} handleChange={handleChange} changeView={changeView}/>;
    }

    return (
        <div className={classes.registration}>
            <h1>Register for an Account</h1>
            {view}
        </div>
    );
}

export default Registration;
