import React from 'react';
import { Checkbox, FormControl, FormControlLabel, IconButton, MenuItem, Select, TextField, Typography } from '@material-ui/core';
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
    <div className={classes.root}>
      <FormControl>
        <div>
          <TextField
            id="outlined-full-width"
            variant="outlined"
            label="Title"
            required
            // fullWidth
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
            value={values.city}
            onChange={handleChange('city')}
          />
          <Select
            value={values.state}
            onChange={handleChange('state')}
          >
            {mockedSelects.states.map((state, index) => {
              return <MenuItem key={index} value={state}>{state}</MenuItem>
            })}
          </Select>
          <Select
            value={values.region}
            onChange={handleChange('region')}
          >
            {mockedSelects.regions.map((region, index) => {
              return <MenuItem key={index} value={region}>{region}</MenuItem>
            })}
          </Select>
        </div>
        <div>
          <Select
            value={values.type}
            onChange={handleChange('type')}
          >
            {mockedSelects.jobTypes.map((type, index) => {
              return <MenuItem key={index} value={type}>{type}</MenuItem>
            })}
          </Select>
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
      </FormControl>
    </div>
  );
}

export default CareerSearch;
