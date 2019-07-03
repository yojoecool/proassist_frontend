import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { toast } from '../../modules';
import { useToken } from '../../hooks';
import Company from './Company';
import JobSeeker from'./JobSeeker';
import Admin from './Admin';
import EditProfile from './EditProfile'
import EditPassword from './EditPassword'
import { AddJob, EditJob } from '../company';

function Profile(props) {
  const { userType } = useToken();

  switch (userType) {
    case 'Company':
      return (
        <Switch>
          <Route exact path="/profile" component={Company} />
          <Route path="/profile/addjob" component={AddJob} />
          <Route path="/profile/editJob" component={EditJob} />
          <Route path="/profile/edit" component={EditProfile} />
          <Route path="/profile/password" component={EditPassword} />
        </Switch>
      );
    case 'JobSeeker':
      return <JobSeeker />;
    case 'Admin':
      return (
        <Switch>
          <Route exact path="/profile" component={Admin} />
          <Route path="/profile/editJob" component={EditJob} />
          <Route path="/profile/password" component={EditPassword} />
        </Switch>
      );
    default:
      toast('You must be logged in to view this page', 'error');
      props.history.replace('/login');
      break;
  }

  return <div />;
}

export default withRouter(Profile);
