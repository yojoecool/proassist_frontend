import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton, TextField, Typography
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { splashpage, logo } from '../img';
import classNames from 'classnames';
// import useWindowDimensions from './modules/useWindowDimensions';

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 35,
    marginBottom: 35
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slogan: {
    marginTop: 10,
    textAlign: 'center'
  },
  search: {
    flexGrow: 1
  },
  logo: {
    width: '100%',
    maxWidth: '100vw'
  },
  sideImg: {
    width: '100%',
    maxWidth: '100vw'
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
      e.preventDefault();
      props.history.replace('/careers', { query });
    };

    return (
      <div className={classNames('row', classes.root)}>
        <div className={classNames(classes.left, "col-sm", "col-md")}>
          <div className={classNames("align-items-center")}>
            <img src={logo} alt="logo" className={classes.logo} />
          </div>

          <Typography variant="h5" className={classes.slogan}>
            Start your career in the medical field today
          </Typography>

          <form className={classes.slogan}>
            <div className={classNames("row")}>
              <TextField
                // id="outlined-simple-start-adornment"
                variant="outlined"
                label="Keyword or Title"
                required
                // fullWidth
                onChange={e => handleChange(e)}
              />

              <IconButton type="submit" onClick={e => submit(e)}>
                <Search />
              </IconButton>
            </div>
          </form>
        </div>

        <div className={classNames(classes.left, "col-sm", "col-md")}>
          <img src={splashpage} alt="splashpage" className={classes.sideImg} />
        </div>
      </div>
    );
  }
  
  export default Splashpage;