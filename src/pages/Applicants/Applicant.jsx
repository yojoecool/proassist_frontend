import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { PdfViewer } from '../../components';

function ApplicantResumeModal({ userId, open }) {
  return (
    <Modal open={open}>
      <PdfViewer userId={userId} />
    </Modal>
  );
}

export default ApplicantResumeModal;