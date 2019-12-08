import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { FileUpload, PdfViewer } from '../../components';
import { useToken } from '../../hooks';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  downloadOnlyButton: {
    color: theme.palette.blue.light,
    marginBottom: 10
  },
  divider: {
    marginTop: 8,
    marginBottom: 8
  },
  welcomeText: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  }
}));

function JobSeeker() {
  const { userId, name } = useToken();
  const [downloadOnlyResume, setDownloadOnly] = React.useState(true);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classNames(classes.welcomeText)}>
        Welcome, {name}!
      </Typography>
      <div
        className={classNames(
          "w-100",
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "my-2"
        )}
      >
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/profile/edit"
          className="mx-2"
        >
          Update Profile
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/profile/password"
          className="mx-2"
        >
          Update Password
        </Button>
      </div>
      <Divider className={classes.divider} />

      <FileUpload />

      <Divider className={classes.divider} />

      <div className={classNames("grid")}>
        <div className="col-sm">
          <div className="text-center">
            <Button
              onClick={() => setDownloadOnly(!downloadOnlyResume)}
              className={classNames(classes.downloadOnlyButton)}
              variant="outlined"
            >
              Toggle Resume Viewer
            </Button>
          </div>
          <PdfViewer userId={userId} downloadOnly={downloadOnlyResume} />
        </div>
      </div>
    </div>
  );
}

export default JobSeeker;
