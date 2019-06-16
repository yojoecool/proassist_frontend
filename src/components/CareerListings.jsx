import React from 'react';
import axios from 'axios';
import { Button, Checkbox, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, FormControlLabel, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, Star, StarBorder } from '@material-ui/icons';
import classNames from 'classnames';
import mockedJobs from '../mocks/mockedJobs';

const useStyles = makeStyles({
  listings: {
    width: '80%',
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
    // flexBasis: "33.33%",
    // flexShrink: 0
  },
});

function Careers() {
  const classes = useStyles();

  const [jobListings, setJobListings] = React.useState([]);

  React.useEffect(() => {
    const getCareers = async () => {
      const { REACT_APP_BACKEND_URL: backend } = process.env;
      const listings = await axios.get(`${backend}/careers`);
      setJobListings(listings.data);
    };

    getCareers();
  }, []);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [saved, setSaved] = React.useState(false);

  const handleSave = isSaved => event => {
    console.log('isSaved:', isSaved);
    setSaved(event.target.checked);
  };

  const handleApply = (e, jobIndex) => {
    console.log('jobIndex applied:', jobIndex);
    // setSelected(null);
  };

  return (
    // <div className={classes.root}>
      <div className={classes.listings}>
        {jobListings.map((job, index) => {
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
              {/* <IconButton
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
              </IconButton> */}
              <FormControlLabel
                control={<Checkbox icon={<StarBorder />} checkedIcon={<Star />} value='saved' />}
              />
              <Button size="medium" onClick={(e) => handleApply(e, index)}>Apply</Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        })}
      </div>
    // </div>
  );
}

export default Careers;
