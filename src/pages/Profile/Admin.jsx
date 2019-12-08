import React from 'react';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <React.Fragment>
      <Button
        size="medium"
        component={Link}
        to="/careers/addJob"
        color="primary"
      >
        Create Job
      </Button>
    </React.Fragment>
  );
}

export default Admin;
