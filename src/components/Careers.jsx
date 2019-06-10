import React from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import classNames from 'classnames';
import mockedJobs from '../mocks/mockedJobs';

const useStyles = makeStyles({
  cardContainer: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  card: {
    width: '100%'
  },
  title: {
    color: "black",
  },
});

function Careers() {
  const classes = useStyles();

  const [selected, setSelected] = React.useState(null);

  const handleSelected = (e, jobIndex) => {
    console.log('handleSelected jobIndex:', jobIndex);
    setSelected(jobIndex);
  };

  const closeDetails = (e) => {
    setSelected(false);
  };

  const handleApply = (e, jobIndex) => {
    console.log('jobIndex applied:', jobIndex);
    setSelected(null);
  };

  return (
    <div>
      <p>Welcome to ProAssist Careers Page!</p>
      <div className={classes.cardContainer}>
        {mockedJobs.map((job, index) => {
          return <Card key={index} className={classes.card}>
            <CardContent>
            <div hidden={selected !== index} className={classNames('d-flex', 'justify-content-end', 'align-items-center')}>
              <IconButton
                color="inherit"
                hidden={selected !== index}
                onClick={e => closeDetails(e)}
              >
                <Close />
              </IconButton>
            </div>
              <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
                {job.title}
              </Typography>
              <Typography color="textSecondary">
                {job.city}, {job.state}
              </Typography>
              <Typography component="p">
                {job.description}
              </Typography>
              <div hidden={selected !== index}>
                <div>
                  Description: 
                  {job.description}
                </div>
                <div>
                  Skills: 
                  <ul>
                    {job.skills.map((skill, index) => {
                      return <li key={index}>{skill}</li>
                    })}
                  </ul>  
                </div>
              </div>
            </CardContent>
            <CardActions>
              <Button size="medium">Save</Button>
              <Button hidden={selected === index} size="medium" onClick={(e) => handleSelected(e, index)}>Expand</Button>
              <Button hidden={selected !== index} size="medium" onClick={(e) => handleApply(e, index)}>Apply</Button>
            </CardActions>
          </Card>
        })}
      </div>
    </div>
  );
}

export default Careers;
