import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Chip, Divider, ExpansionPanel, ExpansionPanelActions,
  ExpansionPanelDetails, ExpansionPanelSummary, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  listings: {
    width: '100%',
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    // backgroundColor: 'pink'
  },
  listing: {
    width: '100%'
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  star: {
    display: 'flex',
    justifyContent: 'flexStart'
  },
  summary: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: "black",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function JobListing({ jobs }) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);   
  };

  return (
      <div className={classes.listings}>
        { jobs.map((job, index) => {
          return (
        <ExpansionPanel key={index} id={index} expanded={expanded === index} className={classes.listing} onChange={handleExpansion(index)}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <div className={classes.column}>
            <div>
              <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
                {job.title}
              </Typography>
              <Typography color="textSecondary">
                {job.city}, {job.state}
              </Typography>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.column}>
            <div className={classes.row}>
              <Typography color="textSecondary">
                Type:&nbsp;
              </Typography>
              <Typography component="pre">
                {job.type}
              </Typography>
            </div>
            <br />
            <div className={classes.row}>
              <Typography color="textSecondary">
                Description:&nbsp;
              </Typography>
              <Typography component="pre">
                {job.description}
              </Typography>
            </div>
            <br />
            <Typography color="textSecondary">
              Skills: 
            </Typography>
            <Typography component="pre">
              {job.skills.map((skill, index) => {
                return <Chip
                  key={index}
                  label={skill}
                  className={classes.chip}
                  />
              })}
            </Typography>
            <br />
            <div className={classes.row}>
              <Typography color="textSecondary">
                Qualifications:&nbsp;
              </Typography>
              <Typography component="pre">
                  {job.qualifications}
              </Typography>
            </div>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
            <Button size="medium" component={Link} to={{pathname: '/profile/editjob', jobId: job.jobId}}>Edit</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
          )
        })}
      </div>
  );
}

export default JobListing;
