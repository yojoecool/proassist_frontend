import React from 'react';
import { useToken } from '../../hooks';

function Company() {
  const { userId } = useToken();

  return (
    <React.Fragment>
      <div>Company</div>
    </React.Fragment>
  );
}

export default Company;
