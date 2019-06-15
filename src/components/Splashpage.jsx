import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl, IconButton, TextField, Typography
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { splashpage } from '../img';
import classNames from 'classnames';
// import useWindowDimensions from './modules/useWindowDimensions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slogan: {
    margin: 20
  },
  search: {
    flexGrow: 1
  }
}));

function Splashpage(props) {
  const classes = useStyles();
    // const { width } = useWindowDimensions();
    // const mobileView = width <= 768;

    const [query, setQueryValue] = React.useState(null);
  
    const handleChange = (e) => {
      setQueryValue(e.target.value);
    };

    const submit = (e) => {
      props.history.replace('/careers');
    };

    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <Typography variant="h2" className={classes.slogan}>
            ProAssist
          </Typography>

          <Typography variant="h5" className={classes.slogan}>
            Start your career in the medical field today
          </Typography>

          <FormControl className={classes.slogan}>
            <div className={classNames('row'), classes.search}>
              <TextField
                // id="outlined-simple-start-adornment"
                variant="outlined"
                label="Keyword or Title"
                required
                // fullWidth
                onChange={e => handleChange(e)}
              />

              <IconButton
                onClick={e => submit(e)}
              >
                <Search />
              </IconButton>
              { console.log('query:', query) }
              {/* { console.log('submitted:', submitted) } */}
            </div>
          </FormControl>
        </div>

        <div className={classNames('align-items-center')}>
          <img src={splashpage} alt="splashpage" />
        </div>
      </div>
    );
  }
  
  export default Splashpage;