import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-reducer";
import { toggleTheme } from "../store/theme-reducer";

function Navigation() {
  const history = useHistory();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleLogout = () => {
    dispatch(authActions.logout());
    alert("logout succesful");
    history.push("/signin");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Expense Tracker App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuth && <NavLink to="/signup">Signup</NavLink>}
            {!isAuth && <NavLink to="/signin">Signin</NavLink>}
            {isAuth && <NavLink to="/profile">Profile</NavLink>}
            {isAuth && (
              <li>
                <Button
                  variant="danger"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </li>
            )}
          </Nav>
          <h4>{darkMode ? "Dark" : "Light"} Theme</h4>
          <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
        </Navbar.Collapse>
        <ul></ul>
      </Container>
    </Navbar>
  );
}

export default Navigation;
