import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Navigation from "./components/Navigation";

import "./App.css";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  return (
    <>
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/update_profile">
              <UpdateProfile />
            </Route>
            <Route path="/forget_password">
              <ForgetPassword />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
