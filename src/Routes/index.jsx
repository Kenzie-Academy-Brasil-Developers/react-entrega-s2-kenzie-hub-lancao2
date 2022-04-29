import { Switch, Route } from "react-router-dom";
import Login from "../Pages/Login";
import SingUp from "../Pages/SingUp";
import Dashboard from "../Pages/Dashboard";
import { useState } from "react";
const Routes = () => {
  const [user, setUser] = useState([]);
  return (
    <Switch>
      <Route exact path="/">
        <Login setUser={setUser} user={user} />
      </Route>
      <Route exact path="/SingUp">
        <SingUp />
      </Route>
      <Route path="/user/:userName">
        <Dashboard setUser={setUser} user={user} />
      </Route>
    </Switch>
  );
};
export default Routes;
