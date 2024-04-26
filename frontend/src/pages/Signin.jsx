import React, { useRef, useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);
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
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        authCtx.login(response.data.idToken);
        console.log("User signed in successfully!");
        alert("User signed in successfully!");
        history.push("/profile");
      }
    } catch (error) {
      //console.log(error);
      console.log(error.response.data.error.message);
      alert(error.response.data.error.message);
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
      <div>
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
          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Signin;
