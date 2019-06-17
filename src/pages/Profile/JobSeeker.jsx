import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider } from '@material-ui/core';
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
  }
}));

function JobSeeker() {
  const { userId } = useToken();
  const [downloadOnlyResume, setDownloadOnly] = React.useState(true);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>Hi</div>
      <Divider className={classes.divider} />

      <FileUpload />

      <Divider className={classes.divider} />

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
  );
}

export default JobSeeker;
