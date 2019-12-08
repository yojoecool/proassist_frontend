import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, IconButton } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import { PdfViewer } from '../../components';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function ApplicantResumeModal({ userId, open, onClose }) {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.paper}>
        <div>
          <IconButton
            color="secondary"
            aria-label="close"
            component="span"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <PdfViewer userId={userId} />
      </div>
    </Modal>
  );
}

export default ApplicantResumeModal;