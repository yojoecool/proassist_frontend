import React from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import classNames from 'classnames';
import CareerSearch from './CareerSearch';
import CareerListings from './CareerListings';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'yellow'
  }
});

function Careers() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <CareerSearch />
      <CareerListings />
    </div>
  );
}

export default Careers;
