import React from 'react';
import { Button, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, Star, StarBorder } from '@material-ui/icons';
import classNames from 'classnames';
import mockedJobs from '../mocks/mockedJobs';
import AnimateHeight from 'react-animate-height';

const useStyles = makeStyles({
  root: {
    width: '80%',
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'pink'
  },
  listing: {
    width: '100%'
  },
  page: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'yellow'
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
    flexBasis: "33.33%",
    flexShrink: 0
  },
});

function Careers() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [saved, setSaved] = React.useState(false);

  const handleSave = (e, isSaved) => {
    console.log('isSaved:', isSaved);
    setSaved(!!isSaved);
  };

  const handleApply = (e, jobIndex) => {
    console.log('jobIndex applied:', jobIndex);
    // setSelected(null);
  };

  return (
    <div className={classes.page}>
      <div className={classes.root}>
        {mockedJobs.map((job, index) => {
          return <ExpansionPanel key={index} expanded={expanded === index} className={classes.listing} onChange={handleExpansion(index)}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <div className={classes.summary}>
                <div>
                  <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
                    {job.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {job.city}, {job.state}
                  </Typography>
                </div>
                {/* <div>
                  <ExpansionPanelActions>
                    <IconButton
                      hidden={saved}
                      className={classes.star}
                      onClick={(e) => handleSave(e, index)}
                    >
                      <StarBorder />
                    </IconButton>
                    <IconButton
                      hidden={!saved}
                      className={classes.star}
                      onClick={(e) => handleSave(e, index)}
                    >
                      <Star />
                    </IconButton>
                  </ExpansionPanelActions>
                </div> */}
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography component="p">
                {job.description}
              </Typography>
              <div>
                Skills: 
                <ul>
                  {job.skills.map((skill, index) => {
                    return <li key={index}>{skill}</li>
                  })}
                </ul>  
              </div>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              {/* <Button size="medium">Save</Button> */}
              <IconButton
                hidden={saved}
                className={classes.star}
                onClick={(e) => handleSave(e, index)}
              >
                <StarBorder />
              </IconButton>
              <IconButton
                hidden={!saved}
                className={classes.star}
                onClick={(e) => handleSave(e, index)}
              >
                <Star />
              </IconButton>
              <Button size="medium" onClick={(e) => handleApply(e, index)}>Apply</Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        })}
      </div>
     </div>
  );
}

export default Careers;
