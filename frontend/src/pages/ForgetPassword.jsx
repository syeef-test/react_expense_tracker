import React, { useRef, useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ForgetPassword() {
  const emailRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    try {
      setLoading(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );

      if (response.status === 200) {
        console.log(response);
        // authCtx.login(response.data.idToken);
        // console.log("User signed in successfully!");
        alert("Password reset mail sent");
        //history.push("/profile");
      }
    } catch (error) {
      console.log(error);
      //   console.log(error.response.data.error.message);
      //   alert(error.response.data.error.message);
      //console.error("Error signing up:", error.message);
      //alert(error.response.data.message);
    } finally {
      setLoading(false);
    }

    emailRef.current.value = "";
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
          <h2>Forget Password</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" ref={emailRef} required />
            </div>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Reseting Password..." : "Reset Password"}
            </Button>
          </form>
          <Link to="/signin">Sign in</Link>
        </Card>
      </div>
    </>
  );
}

export default ForgetPassword;
