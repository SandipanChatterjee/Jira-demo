import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import MasterIssueModal from "../components/dashboard/issueModal/MasterIssueModal";

export const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/project/board" component={Dashboard} />
      <Route
        exact
        path="/project/board/:issueId"
        component={MasterIssueModal}
      />
      <Redirect to="/project/board" from="/" />
    </Switch>
  );
};
