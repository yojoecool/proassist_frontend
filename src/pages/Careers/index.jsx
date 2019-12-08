import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { useToken } from "../../hooks";
import { AddJob, EditJob } from "../company";
import ViewApplicants from '../Applicants/ViewApplicants';
import CareerList from "./CareerList";

function Careers(props) {
  const { userType } = useToken();
  let addlRoutes = [];

  switch (userType) {
    case "Admin":
      addlRoutes = [
        <Route path="/careers/addjob" component={AddJob} key={5} />,
        <Route path="/careers/editJob/:jobId" component={EditJob} key={6} />,
        <Route
          path="/careers/viewApplicants/:jobId"
          component={ViewApplicants}
          key={7}
        />
      ];
      break;
    default:
      break;
  }

  return (
    <Switch>
      <Route exact path="/careers" component={CareerList} key={-1} />
      {addlRoutes.map(route => route)}
    </Switch>
  );
}

export default withRouter(Careers);
