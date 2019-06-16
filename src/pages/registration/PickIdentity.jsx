import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, 
  } from '@material-ui/core';
import { useWindowDimensions } from '../../modules/';
import { Link } from 'react-router-dom';

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
    formField: {
        width: 400,
    },
    button: {
        width: 150,
        margin: 25,
    },
}));

  function PickIdentity() {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const desktopView = width > 768;

    const [state, setState] = React.useState({
        identity: 'jobSeeker',
    });

    const handleChange = (name, event) => {
        if (name === 'phoneNumber') {
            console.log(name)
            console.log(event.target.value)
        }
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
         <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Who are you?</FormLabel>
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
