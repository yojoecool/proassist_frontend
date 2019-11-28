import React from 'react';
import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useToken } from '../hooks';
import classNames from 'classnames';
import mockedSelects from '../mocks/mockedSearchSelects';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  },
  inputs: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  wideWidth: {
    width: '100%'
  },
  spacing: {
    margin: 10
  },
  spacingBetween: {
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    marginLeft: 10
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
      setFilter(currFilters => ({
        ...currFilters,
        title: keyword
      }));
    }
  }, [keyword]);

  const submit = (e) => {
    e.preventDefault();
    updateFilters(filters);
  };

  return (
    <Card className={classes.root}>
      <form>
        <Typography variant="h4" className={classNames(classes.heading, classes.spacing)}>Search</Typography>
        <div className={classNames(classes.inputs, classes.spacing)}>
          <TextField
            id="outlined-full-width"
            label="Title"
            fullWidth
            value={filters.title}
            onChange={handleChange('title')}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={e => submit(e)}
            className={classes.button}
          >
            Search
          </Button>
        </div>
        <div className={classNames(classes.inputs, classes.spacing)}>
          <TextField
            label="City"
            fullWidth
            value={filters.city}
            onChange={handleChange('city')}
          />
          <FormControl className={classNames(classes.wideWidth, classes.spacingBetween)}>
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
        <div className={classNames(classes.inputs, classes.spacing)}>
          <FormControl className={classes.wideWidth}>
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
            className={classes.spacingBetween}
            hidden={userType !== 'JobSeeker'}
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
            hidden={userType !== 'JobSeeker'}
          />
        </div>
      </form>
    </Card>
  );
}

export default CareerSearch;
