import React from 'react';
import { Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import classNames from 'classnames';
import mockedSelects from '../mocks/mockedSearchSelects';

const useStyles = makeStyles({
  root: {
    width: '100%',
    // backgroundColor: 'CornflowerBlue',
    marginTop: 20,
    marginBottom: 20
  },
  inputs: {
    display: 'flex',
    justifyContent: 'spaceEvenly',
    // backgroundColor: 'Goldenrod'
  },
  wideWidth: {
    width: '100%'
  }
});

function CareerSearch() {
  const classes = useStyles();

  const [values, setValue] = React.useState({
    title: '',
    city: '',
    state: '',
    region: '',
    type: '',
    saved: false,
    applied: false,
  });

  const handleChange = name => event => {
    console.log(name, ':', event.target.value);
    if (name === 'saved' || name === 'applied') {
      setValue({
        ...values,
        [name]: event.target.checked
      });
    } else {
      setValue({
        ...values,
        [name]: event.target.value
      });
    }
  };

  const submit = (e) => {
    console.log('submitted!');
  };

  return (
    <form className={classes.root}>

        <div className={classes.wideWidth}>
          <TextField
            // className="w-100"
            id="outlined-full-width"
            variant="outlined"
            label="Title"
            required
            fullWidth
            value={values.title}
            onChange={handleChange('title')}
          />
          <IconButton
            onClick={e => submit(e)}
          >
            <Search />
          </IconButton>
        </div>
        <div className={classes.inputs}>
          <TextField
            // id="outlined-simple-start-adornment"
            variant="outlined"
            label="City"
            fullWidth
            value={values.city}
            onChange={handleChange('city')}
          />
          <FormControl className={classes.wideWidth}>
            <InputLabel>State</InputLabel>
            <Select
              value={values.state}
              fullWidth
              onChange={handleChange('state')}
            >
              {mockedSelects.states.map((state, index) => {
                return <MenuItem key={index} value={state}>{state}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.wideWidth}>
            <InputLabel>Region</InputLabel>
            <Select
              value={values.region}
              fullWidth
              onChange={handleChange('region')}
            >
              {mockedSelects.regions.map((region, index) => {
                return <MenuItem key={index} value={region}>{region}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        <div className={classes.wideWidth}>
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select
              value={values.type}
              fullWidth
              onChange={handleChange('type')}
            >
              {mockedSelects.jobTypes.map((type, index) => {
                return <MenuItem key={index} value={type}>{type}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.saved}
                color='default'
                value='saved'
                onChange={handleChange('saved')}
              />
            }
            label='Saved'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.applied}
                color='default'
                value='applied'
                onChange={handleChange('applied')}
              />
            }
            label='Applied'
          />
        </div>

    </form>
  );
}

export default CareerSearch;
