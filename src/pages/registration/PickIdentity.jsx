import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup 
  } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
        width: 400,
        [theme.breakpoints.down('sm')] : {
            width: 200
        }
    },
    formLabel: {
        color: '#000000'
    },
    button: {
        width: 150,
        margin: 25,
        '&:hover': {
            color: theme.palette.blue.light
        },
        [theme.breakpoints.down('sm')] : {
            width: "60%",
            margin: 12
        },
        [theme.breakpoints.down('xs')] : {
            width: "80%"
        }
    },
}));

  function PickIdentity() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        identity: 'jobSeeker',
    });

    const handleChange = (name, event) => {
        setState({
        ...state,
        [name]: event.target.value,
        });
    };

    let nextPage;
    if (state.identity === "jobSeeker") {
        nextPage = "/register/jobseeker"
    } else if (state.identity === "company") {
        nextPage = "/register/company"
    }


    return (
        <div className={classes.root}>
         <FormControl component="fieldset" className={classes.formfield}>
            <FormLabel className={classes.formLabel}>Who are you?</FormLabel>
            <RadioGroup
            name="identity"
            className={classes.formField}
            value={state.identity}
            onChange={(e) => handleChange('identity', e)}
            >
            <FormControlLabel value="jobSeeker" control={<Radio />} label="Job Seeker" />
            <FormControlLabel value="company" control={<Radio />} label="Company" />
            </RadioGroup>
        </FormControl>

        <Button size="large" variant="contained" color="primary" component={Link} to={nextPage} className={classes.button} >
            Continue
        </Button>
        </div>
    )
}

export default PickIdentity;
