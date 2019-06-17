import React from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import classNames from 'classnames';
import CareerSearch from './CareerSearch';
import CareerListings from './CareerListings';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20
  }
}));

function Careers() {
  const classes = useStyles();

  const [filters, setFilter] = React.useState({});

  const updateFilters = (values) => {
    setFilter(values);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CareerSearch updateFilters={updateFilters} />
        <CareerListings filters={filters} />
      </div>
    </div>
  );
}

export default Careers;
