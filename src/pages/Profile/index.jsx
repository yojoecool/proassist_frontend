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
  let addlRoutes = [];

  switch (userType) {
    case 'Company':
      addlRoutes = [
        (<Route exact path="/profile" component={Company} key={0} />),
        (<Route path="/profile/addjob" component={AddJob} key={1} />),
        (<Route path="/profile/editJob" component={EditJob} key={2} />),
      ];
      break;
    case 'JobSeeker':
      addlRoutes = [
        (<Route exact path="/profile" component={JobSeeker} key={3} />)
      ];
      break;
    case 'Admin':
      addlRoutes = [
        (<Route exact path="/profile" component={Admin} key={4} />),
        (<Route path="/profile/addjob" component={AddJob} key={5} />),
        (<Route path="/profile/editJob" component={EditJob} key={6} />),
      ];
      break;
    default:
      toast('You must be logged in to view this page', 'error');
      props.history.replace('/login');
      break;
  }

  return (
    <Switch>
      <Route path="/profile/edit" component={EditProfile} />
      <Route path="/profile/password" component={EditPassword} />
      {addlRoutes.map(route => route)}
    </Switch>
  );
}

export default withRouter(Profile);
