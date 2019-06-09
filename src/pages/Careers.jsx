import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

  return (
    <div className="Careers">
      <p>Welcome to ProAssist Careers Page!</p>
      <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
          Nuclear Pathologist Assistant
        </Typography>
        <Typography color="textSecondary">
          New York City, NY
        </Typography>
        <Typography component="p">
          Seeking a Nuclear Pathologist Assistant with minimal experience and MRI imaging certifications.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium">Save</Button>
        <Button size="medium">Apply</Button>
      </CardActions>
    </Card>
    </div>
  );
}

export default Careers;
