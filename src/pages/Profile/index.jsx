import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { toast } from '../../modules';
import { useToken } from '../../hooks';
import Company from './Company';
import JobSeeker from'./JobSeeker';
import Admin from './Admin';
import { UserInfo } from '../../components';
import EditProfile from './EditProfile'
import EditPassword from './EditPassword'
import { AddJob, EditJob } from '../company';

function Profile(props) {
  const { userType } = useToken();

  let userView = '';
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
      userView = <JobSeeker />;
      break;
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

  return (
    <React.Fragment>
      <UserInfo />

      <Divider />

      {userView}
    </React.Fragment>
  );
}

export default withRouter(Profile);
