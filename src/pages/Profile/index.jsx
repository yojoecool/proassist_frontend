import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { toast } from '../../modules';
import { useToken } from '../../hooks';
import Company from './Company';
import JobSeeker from'./JobSeeker';
import Admin from './Admin';
import AddJob from '../company/AddJob';

function Profile(props) {
  const { userType } = useToken();

  switch (userType) {
    case 'Company':
      return (
        <Switch>
          <Route exact path="/profile" component={Company} />
          <Route path="/profile/addjob" component={AddJob} />
        </Switch>
      );
    case 'JobSeeker':
      return <JobSeeker />;
    case 'Admin':
      return <Admin />;
    default:
      toast('You must be logged in to view this page', 'error');
      props.history.replace('/login');
      break;
  }

  return <div />;
}

export default withRouter(Profile);
