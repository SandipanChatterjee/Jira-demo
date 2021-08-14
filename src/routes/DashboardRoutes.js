import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";

export const DashboardRoutes = () => {
  return (
    <Switch>
      <Route path="/project/board" component={Dashboard} />
      <Redirect to="/project/board" from="/" />
    </Switch>
  );
};
