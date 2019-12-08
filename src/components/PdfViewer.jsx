import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { pdfjs, Document, Page } from 'react-pdf';
import { saveAs } from 'file-saver';
import { Typography, IconButton, Button } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import "react-pdf/dist/Page/AnnotationLayer.css";
import { toast } from '../modules';
import { useWindowDimensions } from '../hooks';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
  pdfViewer: {
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    overflowY: 'scroll',
    height: '95%'
  },
  pageNums: {
    marginRight: 50,
    marginLeft: 50,
    textAlign: 'center',
    marginTop: 10
  },
  pageNumContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  icons: {
    width: 50
  },
  hidden: {
    display: 'none'
  },
  downloadButton: {
    color: theme.palette.blue.light,
    marginBottom: 10
  },
}));

function PageNumContainer(props) {
  const classes = useStyles();
  const { totalPages, currPage, setCurrPage } = props;

  return (
    <div className={classes.pageNumContainer}>
      <div className={classes.icons}>
        {(totalPages > 1 && currPage > 1) && (
          <IconButton onClick={() => setCurrPage(currPage - 1)}>
            <ChevronLeft />
          </IconButton>
        )}
      </div>

      <Typography variant="subtitle1" className={classes.pageNums}>
        {totalPages && `Page ${currPage} of ${totalPages}`}
      </Typography>

      <div className={classes.icons}>
        {currPage < totalPages && (
          <IconButton onClick={() => setCurrPage(currPage + 1)}>
            <ChevronRight />
          </IconButton>
        )}
      </div>
    </div>
  );
}

function PdfViewer(props) {
  const classes = useStyles();

  // userId will be used with file object's url to get a user's resume
  // alternatively, a url can be passed in isntead of a user id for generic pdfs
  // download only will only render the download button
  const { userId, downloadOnly, url } = props;

  const [token] = useLocalStorage('proAssistToken');

  const [totalPages, setTotalPages] = React.useState(null);
  const [currPage, setCurrPage] = React.useState(1);
  const [fileObject] = React.useState({
    url: !!url ? url : `${process.env.REACT_APP_BACKEND_URL}/users/getResume?user=${userId}`,
    httpHeaders: { 'authorization': 'Bearer ' + token }
  });
  const [currDisplayed, setDisplayed] = React.useState(1);

  const { width } = useWindowDimensions();
  const mobileView = width <= 768;

  const pageWidth = mobileView ? width * 0.8 : width * 0.4;

  const downloadFile = async () => {
    try {
      const response = await axios({
        url: fileObject.url,
        method: 'GET',
        responseType: 'blob',
        headers: fileObject.httpHeaders
      });

      const fileName = !!userId ? 'resume.pdf' : 'file.pdf';
      saveAs(new Blob([response.data]), fileName);
    } catch (err) {
      toast('Unable to download file', 'error');
    }
  };

  return (
    <div className={classes.pdfViewer}>
      <Button
        onClick={downloadFile}
        className={classes.downloadButton}
        variant="outlined"
      >
        {!!url ? 'Download File' : 'Download Resume'}
      </Button>

      {!downloadOnly && (
        <>
          <PageNumContainer
            setCurrPage={setCurrPage}
            currPage={currPage}
            totalPages={totalPages}
          />

          <Document
            file={fileObject}
            onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
            externalLinkTarget="_blank"
          >
            <Page
              pageNumber={currDisplayed}
              renderTextLayer={false}
              width={pageWidth}
            />
            <Page
              className={classNames(classes.hidden)}
              pageNumber={currPage}
              renderTextLayer={false}
              width={pageWidth}
              onLoadSuccess={(page) => setDisplayed(page.pageNumber)}
            />
          </Document>

          <PageNumContainer
            setCurrPage={setCurrPage}
            currPage={currPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  )
}

export default PdfViewer;
