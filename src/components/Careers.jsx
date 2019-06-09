import React from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import classNames from 'classnames';

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

  const [applyClicked, setApplyClicked] = React.useState(false);

  const handleApplyClicked = (e) => {
    setApplyClicked(true);
  };

  const closeDetails = (e) => {
    setApplyClicked(false);
  };

  let description;
  let responsibilities;
  let close;
  let applyButton;
  if (applyClicked) {
    applyButton = <Button size="medium">Submit</Button>
    description = <div>
      Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>;
    responsibilities = <div>
      Responsibilities:
      <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
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
    applyButton = <Button size="medium" onClick={e => handleApplyClicked(e)}>Expand</Button>;
  }

  return (
    <div className="Careers">
      <p>Welcome to ProAssist Careers Page!</p>
      <Card className={classes.card}>
      <CardContent>
        {close}
        <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
          Nuclear Pathologist Assistant
        </Typography>
        <Typography color="textSecondary">
          New York City, NY
        </Typography>
        <Typography component="p">
          Seeking a Nuclear Pathologist Assistant with minimal experience and MRI imaging certifications.
        </Typography>
        {description}
        {responsibilities}
      </CardContent>
      <CardActions>
        <Button size="medium">Save</Button>
        {applyButton}
      </CardActions>
    </Card>
    </div>
  );
}

export default Careers;
