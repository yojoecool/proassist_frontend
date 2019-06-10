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

  const [selected, setSelected] = React.useState(null);

  const handleSelected = (e, jobIndex) => {
    console.log('handleSelected jobIndex:', jobIndex);
    setSelected(jobIndex);
  };

  const closeDetails = (e) => {
    setSelected(false);
  };

  return (
    <div className="Careers">
      <p>Welcome to ProAssist Careers Page!</p>
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
            {/* {close} */}
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
            {/* {description}
            {responsibilities} */}
          </CardContent>
          <CardActions>
            <Button size="medium">Save</Button>
            <Button hidden={selected === index} size="medium" onClick={(e) => handleSelected(e, index)}>Expand</Button>
            <Button hidden={selected !== index} size="medium">Submit</Button>
          </CardActions>
        </Card>
      })}
    </div>
  );
}

export default Careers;
