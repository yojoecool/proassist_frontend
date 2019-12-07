import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, TextField, Typography,
    NativeSelect, Input, InputLabel,
    FormControlLabel, FormLabel, Switch
  } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { toast } from '../../modules';
import { useToken } from '../../hooks';

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
        marginTop: '1%',
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
    center: {
        textAlign: 'center'
    }
}));

function EditJob(props) {
    const { jobId } = props.match.params;
    const classes = useStyles();
    const { userId, userType } = useToken();
    const [token] = useLocalStorage('proAssistToken');
    const [errors, setErrors] = React.useState({ errorText: [] });

    const [state, setState] = React.useState({
        description: '',
        skills: [],
        title: '',
        city: '',
        state: 'AL',
        type: 'Full Time',
        qualifications: '',
    });
    const [activeState, changeActive] = React.useState({
        active: true
    });
    const toggleDisable = _ => {
        changeActive({active: !activeState.active});
    }

    const handleChange = (name, event) => {
        setState({
        ...state,
        [name]: event.target.value,
        });
    };

    const handleAddChip = (chip) => {
        setState({
            ...state,
            skills: [
                ...state.skills,
                chip
            ]
        });
    };

    const handleDeleteChip = (chip, index) => {
        let skillsCopy = state.skills;
        skillsCopy.splice(index, 1);
        setState({
            ...state,
            skills: skillsCopy
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
        ]
    }
    React.useEffect(() => {
        //kick if user is not job owner or admin
        const getJob = async (jobId) => {
          try {
            if (userType !== "Company" && userType !== "Admin") {
                toast('You are not able to edit this job.', 'error'); 
                props.history.goBack();
            }

            const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/companies/getJob`, 
              { 
                headers: { 'authorization': 'Bearer ' + token },
                params: { userId, jobId }
              }
            );
    
            setState({
                description: response.data.job.description,
                skills: response.data.job.skills,
                title: response.data.job.title,
                city: response.data.job.city,
                state: response.data.job.state,
                type: response.data.job.type,
                qualifications: response.data.job.qualifications,
            });
            changeActive({
                active: response.data.job.active
            });
            
          } catch (err) {
            console.log(err)
            toast('Unable to load Job. Please try again later.', 'error');
            props.history.goBack();
          }
        };
        getJob(jobId);
    }, [jobId, userId, userType, token, props.history]);

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

        setErrors(newErrors);
        if (newErrors.errorText.length > 0) {
          toast('Errors on the page.', 'error');
          return;
        }
        try {
          const { REACT_APP_BACKEND_URL } = process.env;
          await axios.put(
                `${REACT_APP_BACKEND_URL}/companies/editJob`, 
                {
                    description: state.description,
                    skills: state.skills,
                    title: state.title,
                    city: state.city,
                    state: state.state,
                    region: state.region,
                    type: state.type,
                    qualifications: state.qualifications,
                    active: activeState.active
                },
                {   
                    headers: { 'authorization': 'Bearer ' + token },
                    params: { userId, jobId },
                },
            );
            toast('Edited Job Successfully!', 'success');
            props.history.goBack();
        } catch (err) {
          if (err.response.status === 403) {
            toast('Authorization error. Please try loging in again', 'error');
          } else {
            toast('Error Editing Job. Please try again later.', 'error');
          }
        }
    };

    const update = (e) => {
        const { [e.target.name]: removed, ...newErrors } = errors;
        setErrors({ ...newErrors, errorText: [] });
    };

    return (
      <div className={classes.root}>
        <Typography variant="h5">Edit Job Form:</Typography>

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
          <FormControlLabel
            control={
              <Switch
                checked={!activeState.active}
                onChange={toggleDisable}
                value="active"
                color="secondary"
              />
            }
            label="Disable Job"
          />
          <FormLabel className={classes.center} component="legend">
            Disabled jobs will no longer be searchable nor able to be applied
            to.
          </FormLabel>
          <TextField
            required
            label="Job Title"
            name="title"
            className={classes.formField}
            value={state.title}
            onChange={e => {
              update(e);
              handleChange("title", e);
            }}
            margin="normal"
            error={errors.title}
            disabled={!activeState.active}
          />
          <TextField
            required
            label="City"
            name="city"
            className={classes.formField}
            value={state.city}
            onChange={e => {
              update(e);
              handleChange("city", e);
            }}
            margin="normal"
            error={errors.city}
            disabled={!activeState.active}
          />
          <InputLabel htmlFor="state-label" className={classes.selectLabel}>
            State
          </InputLabel>
          <NativeSelect
            value={state.state}
            onChange={e => {
              update(e);
              handleChange("state", e);
            }}
            input={
              <Input
                name="state"
                id="state-label"
                error={errors.state}
                className={classes.formField}
                disabled={!activeState.active}
              />
            }
          >
            {constants.states.map((val, index) => {
              return (
                <option value={val} key={index}>
                  {" "}
                  {val}{" "}
                </option>
              );
            })}
          </NativeSelect>
          <InputLabel htmlFor="type-label" className={classes.selectLabel}>
            Job Type
          </InputLabel>
          <NativeSelect
            value={state.type}
            onChange={e => {
              update(e);
              handleChange("type", e);
            }}
            input={
              <Input
                name="region"
                id="type-label"
                error={errors.type}
                className={classes.formField}
                disabled={!activeState.active}
              />
            }
          >
            {constants.jobTypes.map((val, index) => {
              return (
                <option value={val} key={index}>
                  {" "}
                  {val}{" "}
                </option>
              );
            })}
          </NativeSelect>
          <TextField
            required
            label="Qualifications"
            name="qualifications"
            className={classes.formField}
            value={state.qualifications}
            onChange={e => {
              update(e);
              handleChange("qualifications", e);
            }}
            margin="normal"
            multiline
            rowsMax="10"
            error={errors.qualifications}
            disabled={!activeState.active}
          />
          <TextField
            required
            label="Description"
            name="description"
            className={classes.formField}
            value={state.description}
            onChange={e => {
              update(e);
              handleChange("description", e);
            }}
            margin="normal"
            type="description"
            error={errors.description}
            multiline
            rowsMax="10"
            helperText="Content formatting may not be preserved."
            disabled={!activeState.active}
          />
          <ChipInput
            label="Skills"
            name="skills"
            className={classes.formField}
            value={state.skills}
            onAdd={chip => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
            disabled={!activeState.active}
          />

          <div className={classes.buttonDiv}>
            <Button
              size="large"
              variant="contained"
              className={classes.button}
              onClick={props.history.goBack}
            >
              Cancel
            </Button>

            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
}

export default withRouter(EditJob);
