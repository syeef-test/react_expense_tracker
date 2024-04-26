import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirm_passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirm_password = confirm_passwordRef.current.value;

    const key = import.meta.env.VITE_FIREBASE_APP_ID;

    try {
      setLoading(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
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
        console.log("User signed up successfully!");
        alert("User signed up successfully!");
      }
    } catch (error) {
      // console.error("Error signing up:", error.message);
      // alert(error.message);
      console.log(error.response.data.error.message);
      alert(error.response.data.error.message);
    } finally {
      setLoading(false);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirm_passwordRef.current.value = "";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ padding: "20px", maxWidth: "400px" }}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" ref={emailRef} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" ref={passwordRef} required />
          </div>
          <div>
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input
              type="password"
              id="confirm_password"
              ref={confirm_passwordRef}
              required
            />
          </div>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Signup;
