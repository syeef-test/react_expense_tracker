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
import AddExpense from "./pages/AddExpense";

import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/signup">{!isAuth && <Signup />}</Route>
            <Route path="/signin">{!isAuth && <Signin />}</Route>
            <Route path="/profile">{isAuth && <Profile />}</Route>
            <Route path="/update_profile">
              <UpdateProfile />
            </Route>
            <Route path="/forget_password">
              <ForgetPassword />
            </Route>
            <Route path="/add_expense">
              <AddExpense />
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
