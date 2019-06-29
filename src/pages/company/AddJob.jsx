import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, TextField, Typography, NativeSelect, Input, InputLabel
  } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { toast } from '../../modules';

// TODO Fix Formatting
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
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
    selectLabel: {
        margin: '1%',
    },
    button: {
        '&:hover': {
            color: theme.palette.blue.light
        },
        width: 150,
        margin: 25,
        [theme.breakpoints.down('sm')] : {
            width: '80%',
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

function AddJob(props) {
    const classes = useStyles();
    const [errors, setErrors] = React.useState({ errorText: [] });

    const [state, setState] = React.useState({
        description: '',
        // skills: [],
        title: '',
        city: '',
        state: 'AL',
        region: 'Northwest',
        type: 'Full Time',
        qualifications: '',
    });

    const handleChange = (name, event) => {
        setState({
        ...state,
        [name]: event.target.value,
        });
    };
    const constants = {
        jobTypes: ['Full Time', 'Part Time', 'Internship', 'Temporary', 'Freelance'],
        states: [
            'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
            'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
            'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
            'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
            'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
            'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY',
        ],
        regions: ['Northwest', 'Southwest', 'Midwest', 'Northeast', 'Southeast'],
    }
    const submit = async (e) => {
        e.preventDefault();
    
        const newErrors = {errorText:[]};
        if (!constants.states.includes(state.state) ) {
            newErrors.state = true;
            newErrors.errorText = [...newErrors.errorText, 'Invalid State'];
        }
        if (!constants.jobTypes.includes(state.type) ) {
            newErrors.type = true;
            newErrors.errorText = [...newErrors.errorText, 'Invalid Job Type'];
        }
        if (!constants.regions.includes(state.region) ) {
            newErrors.region = true;
            newErrors.errorText = [...newErrors.errorText, 'Invalid Region'];
        }

        setErrors(newErrors);
        if (newErrors.errorText.length > 0) {
          toast('Errors on the page.', 'error');
          return;
        }
        try {
          const { REACT_APP_BACKEND_URL } = process.env;
          const response = await axios.post(
                `${REACT_APP_BACKEND_URL}/companies/addJob`, 
                { 
                    description: state.description,
                    title: state.title,
                    city: state.city,
                    state: state.state,
                    region: state.region,
                    type: state.type,
                    qualifications: state.qualifications,
                }
            );
          toast('Registration Successful!', 'success');
          props.history.push('/login');
        } catch (err) {
          if (err.response.status === 409) {
            toast('User with email already exists.', 'error');
          } else {
            toast('Error registering. Please try again later.', 'error');
          }
        }
    };

    const update = (e) => {
        const { [e.target.name]: removed, ...newErrors } = errors;
        setErrors({ ...newErrors, errorText: [] });
    };

    return (
        <div className={classes.root}>
            <Typography variant='h5'>New Job Form:</Typography>

            <div className={classes.errorHeight}>
                {errors.errorText.map(err => {
                return (
                    <Typography variant='subtitle1' className={classes.errorText}>
                        {err}
                    </Typography>
                )
                })}
            </div>

            <form className={classes.root} onSubmit={submit}>
            <TextField
                required
                label='Job Title'
                name='title'
                className={classes.formField}
                value={state.title}
                onChange={(e) => {update(e); handleChange('title', e)}}
                margin='normal'
                error={errors.title}
            />
            <TextField
                required
                label='City'
                name='city'
                className={classes.formField}
                value={state.city}
                onChange={(e) => {update(e); handleChange('city', e)}}
                margin='normal'
                error={errors.city}
            />
            <InputLabel htmlFor='state-label' className={classes.selectLabel}>State</InputLabel>
            <NativeSelect
                value={state.state}
                onChange={(e) => {update(e); handleChange('state', e)}}
                input={<Input name='state' 
                    id='state-label' 
                    error={errors.state}
                    className={classes.formField}/>
                }
            >
                {constants.states.map(val => {
                    return (
                        <option value={val}> {val} </option>
                    )
                })}
            </NativeSelect>
            <InputLabel htmlFor='region-label' className={classes.selectLabel}>Region</InputLabel>
            <NativeSelect
                value={state.region}
                onChange={(e) => {update(e); handleChange('region', e)}}
                input={<Input name='region' 
                    id='region-label' 
                    error={errors.region}
                    className={classes.formField}/>
                }
            >
                {constants.regions.map(val => {
                    return (
                        <option value={val}> {val} </option>
                    )
                })}
            </NativeSelect>
            <InputLabel htmlFor='type-label' className={classes.selectLabel} >Job Type</InputLabel>
            <NativeSelect
                value={state.type}
                onChange={(e) => {update(e); handleChange('type', e)}}
                input={<Input name='region' 
                    id='type-label' 
                    error={errors.type}
                    className={classes.formField}/>
                }
            >
                {constants.jobTypes.map(val => {
                    return (
                        <option value={val}> {val} </option>
                    )
                })}
            </NativeSelect>
            <TextField
                required
                label='Qualifications'
                name='qualifications'
                className={classes.formField}
                value={state.qualifications}
                onChange={(e) => {update(e); handleChange('qualifications', e)}}
                margin='normal'
                multiline
                rowsMax='10'
                error={errors.qualifications}
            />
            <TextField
                required
                label='Description'
                name='description'
                className={classes.formField}
                value={state.description}
                onChange={(e) => {update(e); handleChange('description', e)}}
                margin='normal'
                type='description'
                error={errors.description}
                multiline
                rowsMax='10'
                helperText='Content formatting may not be preserved.'
            />

            <div className={classes.buttonDiv}> 
                <Button size='large' variant='contained' component={Link} to='/profile' className={classes.button}>
                    Cancel
                </Button>

                <Button size='large' variant='contained' color='primary' className={classes.button} type='submit'>
                    Submit
                </Button>
            </div>
            </form>
        </div>
    )
}

export default withRouter(AddJob);
