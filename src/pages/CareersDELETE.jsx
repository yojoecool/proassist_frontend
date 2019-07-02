import React from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import classNames from 'classnames';
import CareerSearch from '../components/CareerSearch';
import CareerListings from '../components/CareerListings';

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

function Careers(props) {
  const classes = useStyles();

  const [filters, setFilter] = React.useState({});

  const updateFilters = (values) => {
    setFilter(values);
  };

  React.useEffect(() => {
    // console.log('location.state in Careers:', props.history.location.state);
    // setFilter({
    //   title: props.history.location.state),
    //   city: '',
    //   state: '',
    //   region: '',
    //   type: '',
    //   saved: false,
    //   applied: false,
    // });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CareerSearch updateFilters={updateFilters} keyword={props.history.location.state} />
        <CareerListings filters={filters} keyword={props.history.location.state} />
      </div>
    </div>
  );
}

export default Careers;
