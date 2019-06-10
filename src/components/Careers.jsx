import React from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import classNames from 'classnames';
import mockedJobs from '../mocks/mockedJobs';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  title: {
    color: "black",
  },
});

function Careers() {
  const classes = useStyles();

  const [selected, setSelected] = React.useState(false);

  const handleSelected = (job) => {
    setSelected(true);
  };

  const closeDetails = (e) => {
    setSelected(false);
  };

  let description;
  let responsibilities;
  let close;
  let applyButton;
  if (selected) {
    applyButton = <Button size="medium">Submit</Button>
    description = <div>
      {job.description}
    </div>;
    responsibilities = <div>
      Responsibilities:
      <ul>
        {jobs.skills.map((skill, index) => {
          return <li>{skill}</li>
        })}
      </ul>  
    </div>;
    close = <div className={classNames('d-flex', 'justify-content-end', 'align-items-center')}>
      <IconButton
        color="inherit"
        onClick={e => closeDetails(e)}
      >
        <Close />
      </IconButton>
    </div>;
  } else {
    applyButton = <Button size="medium" onClick={handleSelected(job)}>Expand</Button>;
  }

  return (
    <div className="Careers">
      <p>Welcome to ProAssist Careers Page!</p>
      {mockedJobs.map((job, index) => {
        return <Card className={classes.card}>
          <CardContent>
            {close}
            <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
              {job.title}
            </Typography>
            <Typography color="textSecondary">
              {job.city}, {job.state}
            </Typography>
            <Typography component="p">
              {job.description}
            </Typography>
            {description}
            {responsibilities}
          </CardContent>
          <CardActions>
            <Button size="medium">Save</Button>
            {applyButton}
          </CardActions>
        </Card>
      })}
    </div>
  );
}

export default Careers;
