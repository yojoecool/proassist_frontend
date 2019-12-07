import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  NativeSelect,
  FormControlLabel,
  FormLabel,
  Switch,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { toast } from '../../modules';
import { useToken } from '../../hooks';
import { JobListing } from '../company';

function ViewApplicants() {
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
    <div className="d-flex align-items-center flex-column my-3">
      {job && (
        <div className="w-75">
          <JobListing jobs={[job]} />
        </div>
      )}
      {applicants.length > 0 && <div>Applicants</div>}
    </div>
  );
}

export default ViewApplicants;
