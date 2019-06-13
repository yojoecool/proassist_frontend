import React from 'react';
import { withRouter } from 'react-router-dom';
import { FileUpload, PdfViewer } from '../components';
import { decodeToken, toast } from '../modules';

function FileTests(props) {
  if (!decodeToken()) {
    toast('You must be logged in to view this page', 'error');
    props.history.replace('/login');
  } else {
    const { userId } = decodeToken();

    return (
      <React.Fragment>
        <FileUpload />
        <PdfViewer userId={userId} />
      </React.Fragment>
    );
  }

  return <div />;
}

export default withRouter(FileTests);
