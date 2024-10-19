import React, { useRef, useState, useContext } from "react";

import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { authActions } from "../store/auth-reducer";
import { useDispatch } from "react-redux";

function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    try {
      setLoading(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );

      if (response.status === 200) {
        //console.log(response);

        dispatch(authActions.login(response.data));
        // authCtx.login(response.data.idToken);
        console.log("User signed in successfully!");
        alert("User signed in successfully!");
        history.push("/profile");
      }
    } catch (error) {
      //console.log(error);
      //console.log(error.response.data.error.message);
      alert(error);
      //console.error("Error signing up:", error.message);
      //alert(error.response.data.message);
    } finally {
      setLoading(false);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card style={{ padding: "20px", maxWidth: "400px" }}>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" ref={emailRef} required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" ref={passwordRef} required />
            </div>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <Link to="/forget_password">Forget Password ?</Link>
        </Card>
      </div>
    </>
  );
}

export default Signin;
