import React from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { CareerListings, CareerSearch } from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  }
}));

function Careers(props) {
  const classes = useStyles();
  const limit = 10;

  const [filters, setFilter] = React.useState(() => {
    if (props.history && props.history.location && props.history.location.state) {
      return { title: props.history.location.state.query || '' }
    }
    return {};
  });

  const [offset, setOffset] = React.useState(0);

  const [length, setLength] = React.useState(0);

  const updateFilters = (values) => {
    setFilter(values);
    setOffset(0);
  };

  const updateOffset = (e, num) => {
    setOffset(offset + num);
  };

  const updateLength = (newLength) => {
    setLength(newLength);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CareerSearch updateFilters={updateFilters} keyword={filters.title} />
        <CareerListings filters={filters} offset={offset} updateLength={updateLength} />
        <div className={classes.pagination}>
          <IconButton
            disabled={offset <= 0}
            onClick={e => updateOffset(e, -limit)}
          >
            <NavigateBefore />
          </IconButton>
          <IconButton
            disabled={offset + limit >= length}
            onClick={e => updateOffset(e, limit)}
          >
            <NavigateNext />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Careers;
