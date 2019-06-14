import React from 'react';
import { withRouter } from 'react-router-dom';
import { FileUpload, PdfViewer } from '../components';
import { toast } from '../modules';
import { useToken } from '../hooks';

function FileTests(props) {
  const { userType, userId } = useToken();

  if (userType === 'Visitor') {
    toast('You must be logged in to view this page', 'error');
    props.history.replace('/login');
  } else {
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
