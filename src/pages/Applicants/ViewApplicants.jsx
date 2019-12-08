import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Typography, Select, FormControl, InputLabel, CircularProgress
} from "@material-ui/core";
import classNames from "classnames";
import { toast } from '../../modules';
import { JobListing } from '../company';
import Applicant from './Applicant';
import SendMessageModal from './SendMessage';

const useStyles = makeStyles(theme => ({
  evenRow: {
    backgroundColor: "#ede8e5"
  }
}));

function ViewApplicants() {
  const classes = useStyles();

  const [token] = useLocalStorage("proAssistToken");
  const { jobId } = useParams();
  const { REACT_APP_BACKEND_URL: backend } = process.env;

  const [job, setJob] = React.useState(null);
  const [applicants, setApplicants] = React.useState([]);
  const [loading, setLoad] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [top, setTop] = React.useState(0);
  const [selectedApplicant, setSelectedApplicant] = React.useState(null);
  const [resumeModal, setResumeModal] = React.useState(false);
  const [messageModal, setMessageModal] = React.useState(false);

  React.useEffect(() => {
    const getJob = async () => {
      try {
        setLoad(true);

        const response = await axios.get(`${backend}/careers/applicants`, {
          params: { jobId },
          headers: { authorization: 'Bearer ' + token }
        });
        setPage(0);

        const { job, applicants, count } = response.data;

        if (count <= pageSize) {
          setTop(count);
        } else {
          setTop(pageSize);
        }

        setApplicants(applicants);
        setJob(job);
      } catch (err) {
        toast("Error during search. No applicable listings found.", "error");
      } finally {
        setLoad(false);
      }
    };

    getJob();
  }, [token, jobId]);

  if (loading) {
    return (
      <div
        className={classNames(
          "d-flex",
          "align-items-center",
          "flex-column",
          "my-3",
          "py-5"
        )}
      >
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const openResume = (userId) => () => {
    setSelectedApplicant(userId);
    setResumeModal(true);
  }

  const openMessage = userId => () => {
    setSelectedApplicant(userId);
    setMessageModal(true);
  };

  return (
    <div
      className={classNames(
        "d-flex",
        "align-items-center",
        "flex-column",
        "my-3"
      )}
    >
      {job && (
        <div className="w-75">
          <JobListing jobs={[job]} />
        </div>
      )}
      <div className={classNames("w-75", "grid", "my-2")}>
        <div className={classNames("row", "border-bottom", "py-2")}>
          <div className={classNames("col-sm", "py-2")}>Name</div>
          <div className={classNames("col-sm", "py-2")}>Email</div>
          <div className="col-sm" />
          <div className="col-sm" />
          <div className={classNames("col-sm", "py-2")}>Status</div>
        </div>
        {applicants.map((applicant, index) => {
          const { firstName, lastName, User, userId, JobsApplied } = applicant;
          const { email } = User;
          const { status } = JobsApplied;
          return (
            <div
              className={classNames("row", "border-bottom", "py-2", {
                [classes.evenRow]: index % 2 === 0
              })}
              key={userId}
            >
              <div className={classNames("col-sm", "py-2")}>
                <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
              </div>
              <div className={classNames("col-sm", "py-2")}>
                <Typography variant="body1">{email}</Typography>
              </div>
              <div className="col-sm">
                <Button size="medium" onClick={openResume(userId)}>
                  View Resume
                </Button>
              </div>
              <div className="col-sm">
                <Button size="medium" onClick={openMessage(userId)}>
                  Send Message
                </Button>
              </div>
              <FormControl className={classNames("col-sm")}>
                <InputLabel>Status</InputLabel>
                <Select native value={status} onChange={() => {}}>
                  <option value="Applied">Applied</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Rejected">Rejected</option>
                </Select>
              </FormControl>
            </div>
          );
        })}
      </div>

      <Applicant
        userId={selectedApplicant}
        open={resumeModal}
        onClose={() => setResumeModal(false)}
      />

      <SendMessageModal
        userId={selectedApplicant}
        open={messageModal}
        onClose={() => setMessageModal(false)}
      />
    </div>
  );
}

export default ViewApplicants;
