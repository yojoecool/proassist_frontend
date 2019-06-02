import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { facebook, linkedIn, twitter } from './img';
// import useWindowDimensions from './modules/useWindowDimensions';

const useStyles = makeStyles(theme => ({
  footer: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    bottom: 0,
    position: 'fixed',
    minHeight: 125
  },
  bottomSection: {
    width: '100%',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    minHeight: 35,
    position: 'fixed',
    bottom: 0
  },
  colSection: {
    minHeight: 90
  },
  mediaDiv: {
    minHeight: 35
  }
}));

function Footer(props) {
  const classes = useStyles();
  return (
    <section className={classNames(classes.footer)}>
      <div className={classNames('row')}>
        <div
          className={
            classNames(classes.colSection,
              'col', 'd-flex', 'align-items-center', 
              'justify-content-center'
          )}
        >
          <Typography variant="h6">
            ProAssist
          </Typography>
        </div>
      </div>
      <div className={classNames(classes.bottomSection)}>
        <div
          className={
            classNames('col', 'd-flex', 'align-items-center', 
              'justify-content-center', classes.mediaDiv
          )}
        >
          <img src={twitter} className="mr-3" alt="twitter" height="32" width="32" />
          <img src={facebook} className="mr-3" alt="facebook" height="32" width="32" />
          <img src={linkedIn} alt="linkedIn" height="32" width="32" />
        </div>
      </div>
    </section>
  );
}

export default Footer;