import React from 'react';
import { withRouter } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { toast } from '../../modules';
import { useToken } from '../../hooks';
import Company from './Company';
import JobSeeker from'./JobSeeker';
import Admin from './Admin';
import { UserInfo } from '../../components';

function Profile(props) {
  const { userType } = useToken();

  let userView = '';
  switch (userType) {
    case 'Company':
      userView = <Company />;
      break;
    case 'JobSeeker':
      userView = <JobSeeker />;
      break;
    case 'Admin':
      userView = <Admin />;
      break;
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
