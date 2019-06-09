import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { Typography, IconButton, Button } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useWindowDimensions } from '../modules';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
  pdfViewer: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center'
  },
  pageNums: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: 10
  },
  pageNumContainer: {
    display: 'flex',
    justifyContent: 'space-around'
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
  }
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
  // downloadOnly will only render the download button
  const { userId, downloadOnly, url } = props;

  const [totalPages, setTotalPages] = React.useState(null);
  const [currPage, setCurrPage] = React.useState(1);
  const [fileObject] = React.useState({ url: `${process.env.REACT_APP_BACKEND_URL}/pdf` });
  const [currDisplayed, setDisplayed] = React.useState(1);

  const { width } = useWindowDimensions();
  const mobileView = width <= 768;

  const pageWidth = mobileView ? width * 0.9 : width * 0.65;

  return (
    <div className={classes.pdfViewer}>
      <Button
        href={fileObject.url}
        className={classes.downloadButton}
        variant="outlined"
      >
        Download PDF
      </Button>

      {!downloadOnly && (
        <React.Fragment>
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
            <Page pageNumber={currDisplayed} renderTextLayer={false} width={pageWidth} />
            <Page
              className={classes.hidden}
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
        </React.Fragment>
      )}
    </div>
  )
}

export default PdfViewer;
