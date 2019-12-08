import React from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { Modal, IconButton, TextField, Button, CircularProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useLocalStorage from "react-use-localstorage";
import classNames from 'classnames';
import { toast } from "../../modules";

const useStyles = makeStyles(theme => ({
  paper: {
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  sendButton: {
    backgroundColor: theme.palette.blue.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.blue.dark,
      color: "white"
    }
  },
  buttonWrapper: {
    position: "relative",
    marginBottom: 15
  },
  message: {
    overflowY: "scroll",
    height: "95%"
  }
}));

function SendMessageModal({ userId, open, onClose }) {
  const classes = useStyles();
  const [token] = useLocalStorage("proAssistToken");
  const { REACT_APP_BACKEND_URL: backend } = process.env;

  const [loading, setLoad] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [subject, setSubject] = React.useState('');

  const sendMessage = async () => {
    setLoad(true);
    try {
      await axios.post(
        `${backend}/users/sendMessage`,
        { userId, message, subject },
        { headers: { authorization: "Bearer " + token } }
      );

      toast('Successfully sent message', 'success');
      setMessage('');
      setSubject('');
      onClose();
    } catch (err) {
      toast("Error sending message. Please try again later", "error");
    } finally {
      setLoad(false);
    }
  }

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
        <div
          className={classNames(
            "d-flex",
            "flex-column",
            "align-items-center",
            "justify-content-center",
            classes.message
          )}
        >
          <TextField
            variant="outlined"
            label="Subject"
            className={classNames("w-75", "my-2")}
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <TextField
            multiline
            rows="25"
            variant="outlined"
            label="Message"
            className={classNames("w-75", "my-2")}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              onClick={sendMessage}
              className={classNames(classes.sendButton)}
              color="primary"
              disabled={loading}
            >
              Send Message
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SendMessageModal;
