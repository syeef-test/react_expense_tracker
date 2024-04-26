import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { Navbar, Container, Nav } from "react-bootstrap";

function Navigation() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const handleLogout = () => {
    authCtx.logout();
    console.log("logout succesful");
    alert("logout succesful");
    history.push("/signin");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">E-com App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isLoggedIn && <NavLink to="/signup">Signup</NavLink>}

            {!isLoggedIn && <NavLink to="/signin">Signin</NavLink>}
            {isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
            {isLoggedIn && (
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </Nav>
        </Navbar.Collapse>
        <ul></ul>
      </Container>
    </Navbar>
  );
}

export default Navigation;
