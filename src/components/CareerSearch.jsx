import React from 'react';
import { Card, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { useToken } from '../hooks';
import classNames from 'classnames';
import mockedSelects from '../mocks/mockedSearchSelects';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.yellow.light,
    marginBottom: 20
  },
  headingsText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  },
  inputs: {
    display: 'flex',
    justifyContent: 'spaceEvenly',
  },
  wideWidth: {
    width: '100%'
  }
}));

function CareerSearch({ updateFilters, keyword }) {
  const classes = useStyles();
  const { userType } = useToken();

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
        [name]: event.target.value
      });
    }
  };

  React.useEffect(() => {
    if (keyword) {
      console.log('keyword:', keyword.query);
      setFilter({
        ...filters,
        title: keyword.query
      });
    }
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log('submitted!');
    updateFilters(filters);
  };

  return (
    <Card className={classes.root}>
      <form>
        <Typography variant="h5" className={classes.headingsText}>Search</Typography>
        <div className={classes.wideWidth}>
          <TextField
            // className="w-100"
            id="outlined-full-width"
            variant="outlined"
            label="Title"
            required
            // fullWidth
            value={filters.title}
            onChange={handleChange('title')}
          />
          <IconButton
            type="submit"
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
            hidden={userType === 'Visitor'}
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
            hidden={userType === 'Visitor'}
          />
        </div>
      </form>
    </Card>
  );
}

export default CareerSearch;
