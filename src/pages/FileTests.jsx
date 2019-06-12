import React from 'react';
import { withRouter } from 'react-router-dom';
import { FileUpload, PdfViewer } from '../components';
import { decodeToken, toast } from '../modules';

function FileTests(props) {
  if (!decodeToken()) {
    toast('You must be logged in to view this page', 'error');
    props.history.replace('/login');
  } else {
    return (
      <React.Fragment>
        <FileUpload />
        <PdfViewer userId="546ec3f6-67cf-44a2-9054-ba0d8cb7c88c" />
      </React.Fragment>
    );
  }

  return <div />;
}

export default withRouter(FileTests);
