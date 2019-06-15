import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import useLocalStorage from 'react-use-localstorage';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from '../modules';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 10,
  },
  buttonWrapper: {
    position: 'relative',
    marginBottom: 15
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  uploadButton: {
    backgroundColor: theme.palette.blue.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.blue.dark,
      color: 'white'
    }
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexWrap: 'wrap'
  },
  textInput: {
    width: 300,
    marginBottom: 15,
    padding: 5,
    '@media (max-width:525px)': {
      width: '100%'
    }
  }
}));

function FileUpload() {
  const classes = useStyles();

  const [fileData, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [token] = useLocalStorage('proAssistToken');

  const fileInput = React.useRef(null);

  const onChangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (e.target.files[0].type !== 'application/pdf') {
      toast('Only PDF files are accepted', 'error');
      return;
    }

    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const onFileButtonClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  }

  const submit = async (e) => {
    e.preventDefault();

    if (!fileData) {
      toast('No File Selected', 'error');
      return;
    }

    var data = new FormData();
    data.append('file', fileData);

    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/uploadResume`,
        data,
        { headers: { authorization: 'Bearer ' + token } }
      );
      toast('File successfully uploaded!', 'success');

      setFile(null);
      setFileName('');
      fileInput.current.value = null;
    } catch (err) {
      console.log(err);
      toast('File upload failed. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className={classes.form}>
      <TextField
        value={fileName}
        variant="outlined"
        label="File Upload"
        className={classes.textInput}
        disabled
      />

      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          onClick={onFileButtonClick}
          className={classNames(classes.button, classes.uploadButton)}
          disabled={loading}
        >
          Select File
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>

      <input type="file" name="blah" onChange={onChangeFile} hidden ref={fileInput} accept=".pdf" />


      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classNames(classes.button)}
          disabled={loading}
        >
          Submit
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </form>
  );
}

export default FileUpload;
