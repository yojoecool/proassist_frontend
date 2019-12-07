import React from 'react';
import { Chip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  column: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    color: "black"
  },
  chip: {
    margin: theme.spacing(0.5)
  },
}));

function JobDetails({ job }) {
  const classes = useStyles();

  return (
    <div className={classes.column}>
      <div className={classes.row}>
        <Typography color="textSecondary">Type:&nbsp;</Typography>
        <Typography component="pre">{job.type}</Typography>
      </div>
      <br />
      <Typography color="textSecondary">Description:&nbsp;</Typography>
      <Typography component="pre">{job.description}</Typography>
      <br />
      <Typography color="textSecondary">Skills:</Typography>
      <Typography component="pre">
        {job.skills.map((skill, index) => {
          return <Chip key={index} label={skill} className={classes.chip} />;
        })}
      </Typography>
      <br />
      <div className={classes.row}>
        <Typography color="textSecondary">Qualifications:&nbsp;</Typography>
        <Typography component="pre">{job.qualifications}</Typography>
      </div>
    </div>
  );
}

function JobSummary({ job, userType }) {
  const classes = useStyles();

  return (
    <div className={classes.column}>
      <div>
        <Typography
          className={classes.title}
          variant="h5"
          color="textSecondary"
          gutterBottom
        >
          {job.title}
        </Typography>
        <Typography color="textSecondary">
          {job.city}, {job.state}
        </Typography>
        {userType === "Admin" && (
          <Typography color="textSecondary">
            Applicants: {job.AppliedBy.length}
          </Typography>
        )}
      </div>
    </div>
  );
}

export { JobSummary, JobDetails };
