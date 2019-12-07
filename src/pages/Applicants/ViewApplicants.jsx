import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Select, FormControl, InputLabel } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import classNames from "classnames";
import { toast } from '../../modules';
import { useToken } from '../../hooks';
import { JobListing } from '../company';

function ViewApplicants() {
  const classes = useStyles();

  const { userType } = useToken();
  const [token] = useLocalStorage("proAssistToken");
  const { jobId } = useParams();
  const { REACT_APP_BACKEND_URL: backend } = process.env;

  const [job, setJob] = React.useState(null);
  const [applicants, setApplicants] = React.useState([]);
  const [loading, setLoad] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [top, setTop] = React.useState(0);

  React.useEffect(() => {
    const getJob = async () => {
      try {
        setLoad(true);

        const response = await axios.get(`${backend}/careers/applicants`, {
          params: { jobId }
        });
        setLoad(false);
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
        setLoad(true);
        toast("Error during search. No applicable listings found.", "error");
      }
    };

    getJob();
  }, [token, page, setPage, jobId]);

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
      <div className={classNames("w-75", "grid")}>
        <div className={classNames("row", "border-bottom", "my-2", "my-0")}>
          <div className={classNames("col-sm", "py-2")}>Name</div>
          <div className={classNames("col-sm", "py-2")}>Email</div>
          <div className="col-sm" />
          <div className="col-sm" />
          <div className="col-sm">Status</div>
        </div>
        {applicants.map((applicant, index) => {
          const { firstName, lastName, User, userId, JobsApplied } = applicant;
          const { email } = User;
          const { status } = JobsApplied;
          return (
            <div
              className={classNames("row", "border-bottom", "py-2")}
              key={userId}
            >
              <div className={classNames("col-sm", "py-2")}>
                <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
              </div>
              <div className={classNames("col-sm", "py-2")}>
                <Typography variant="body1">{email}</Typography>
              </div>
              <div className="col-sm">
                <Button size="medium">View Resume</Button>
              </div>
              <div className="col-sm">
                <Button size="medium">Send Message</Button>
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
    </div>
  );
}

export default ViewApplicants;
