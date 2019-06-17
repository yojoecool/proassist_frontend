import React from 'react';
import { Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import classNames from 'classnames';
import mockedSelects from '../mocks/mockedSearchSelects';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.yellow.light,
    marginBottom: 20
  },
  inputs: {
    display: 'flex',
    justifyContent: 'spaceEvenly',
  },
  wideWidth: {
    width: '100%'
  }
}));

function CareerSearch({ updateFilters }) {
  const classes = useStyles();

  const [filters, setFilter] = React.useState({
    title: '',
    city: '',
    state: '',
    region: '',
    type: '',
    saved: false,
    applied: false,
  });

  const handleChange = name => event => {
    // console.log(name, ':', event.target.value);
    if (name === 'saved' || name === 'applied') {
      setFilter({
        ...filters,
        [name]: event.target.checked
      });
    } else {
      setFilter({
        ...filters,
        [name]: event.target.value.toLowerCase()
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    console.log('submitted!');
    updateFilters(filters);
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
            value={filters.title}
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
            value={filters.city}
            onChange={handleChange('city')}
          />
          <FormControl className={classes.wideWidth}>
            <InputLabel>State</InputLabel>
            <Select
              value={filters.state}
              fullWidth
              onChange={handleChange('state')}
            >
              <MenuItem value=''></MenuItem>
              {mockedSelects.states.map((state, index) => {
                return <MenuItem key={index} value={state}>{state}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.wideWidth}>
            <InputLabel>Region</InputLabel>
            <Select
              value={filters.region}
              fullWidth
              onChange={handleChange('region')}
            >
              <MenuItem value=''></MenuItem>
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
              value={filters.type}
              fullWidth
              onChange={handleChange('type')}
            >
              <MenuItem value=''></MenuItem>
              {mockedSelects.jobTypes.map((type, index) => {
                return <MenuItem key={index} value={type}>{type}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.saved}
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
                checked={filters.applied}
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
