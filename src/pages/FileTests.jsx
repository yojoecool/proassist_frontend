import React from 'react';
import { FileUpload, PdfViewer } from '../components';

function FileTests() {
  return (
    <React.Fragment>
      <FileUpload />
      <PdfViewer userId="546ec3f6-67cf-44a2-9054-ba0d8cb7c88c" />
    </React.Fragment>
  );
}

export default FileTests;
