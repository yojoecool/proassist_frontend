import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { Button, Divider, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import { useToken } from '../../hooks';
import { toast } from '../../modules';

const useStyles = makeStyles({
  listings: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  listing: {
    width: '100%'
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
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
  }
});

function CompanyListing({ companies }) {
  const classes = useStyles();
  const { userId } = useToken();
  const [token] = useLocalStorage('proAssistToken');

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);   
  };

  const updateCompanyStatus = async (companyId, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/updateCompanyStatus`, 
        { companyId, status },
        { headers: { 'authorization': 'Bearer ' + token },
          params: { userId }
        });      
        //add toast
        //add function from admin to remove job from company list
    } catch (err) {
      console.log(err);
      toast('Error sending response', 'error');
    }
  };

  return (
      <div className={classes.listings}>
        { companies.map((company, index) => {
          return (
        <ExpansionPanel key={index} id={index} expanded={expanded === index} 
          className={classes.listing} onChange={handleExpansion(index)}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <div className={classes.column}>
            <div>
              <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
                {company.name}
              </Typography>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.column}>
            <div className={classes.row}>
              <Typography color="textSecondary">
                Point of Contact:&nbsp;
              </Typography>
              <Typography component="pre">
                {company.poc.firstName} {company.poc.lastName}
              </Typography>
              <Typography component="pre">
                {company.poc.phoneNumber}
              </Typography>
              <Typography component="pre">
                {company.poc.email}
              </Typography>
            </div>
        </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
            <Button size="medium" color="primary" onClick={() => updateCompanyStatus(company.userId, 'Active')}>
                Approve
            </Button>
             <Button size="medium" color="secondary" onClick={() => updateCompanyStatus(company.userId, 'Rejected')}>
                Reject
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
          )
        })}
      </div>
  );
}

export default CompanyListing;
