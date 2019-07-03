import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

  const [filters, setFilter] = React.useState(() => {
    if (props.history && props.history.location && props.history.location.state) {
      return { title: props.history.location.state.query || '' }
    }
    return {};
  });

  const updateFilters = (values) => {
    setFilter(values);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CareerSearch updateFilters={updateFilters} keyword={filters.title} />
        <CareerListings filters={filters} />
      </div>
    </div>
  );
}

export default Careers;
