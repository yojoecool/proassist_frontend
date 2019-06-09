import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from '../modules';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 10,
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
    width: 300
  }
}));

function FileUpload() {
  const classes = useStyles();

  const [fileData, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');

  const fileInput = React.createRef();

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
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/s3pdf`, data);
      toast('File successfully uploaded!', 'success');
    } catch (err) {
      toast('File upload failed. Please try again later.', 'error');
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

      <Button
        variant="contained"
        onClick={onFileButtonClick}
        className={classNames(classes.button, classes.uploadButton)}
      >
        Select File
      </Button>

      <input type="file" name="blah" onChange={onChangeFile} hidden ref={fileInput} accept=".pdf" />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classNames(classes.button)}
      >
        Submit
      </Button>
    </form>
  );
}

export default FileUpload;
