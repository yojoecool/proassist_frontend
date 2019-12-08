import React from "react";
import classNames from "classnames";
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    position: 'relative',
    marginBottom: 15
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  button: {
    backgroundColor: theme.palette.blue.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.blue.dark,
      color: 'white'
    }
  },
}));

function LoadingButton({ text, loading, wrapperClasses, ...buttonProps }) {
  const classes = useStyles();

  return (
    <div className={classNames(classes.buttonWrapper, wrapperClasses)}>
      <Button
        {...buttonProps}
        className={classNames(classes.button)}
        disabled={loading}
      >
        {text}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
}

export default LoadingButton;
