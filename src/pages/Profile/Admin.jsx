import React from 'react';
import { useToken } from '../../hooks';

function Admin() {
  const { userId } = useToken();

  return (
    <React.Fragment>
      <div>Admin</div>
    </React.Fragment>
  );
}

export default Admin;
