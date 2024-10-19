import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import axios from "axios";
import Button from "react-bootstrap/Button";

function Profile() {
  const [emailVerified, setEmailVerfied] = useState(false);
  const sendEmailVerification = async () => {
    try {
      const key = import.meta.env.VITE_FIREBASE_APP_ID;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );

      if (response.status === 200) {
        //console.log(response.data.users[0].displayName);
        // if (
        //   response.data.users[0].displayName &&
        //   response.data.users[0].photoUrl
        // ) {
        //   setComplete(true);
        // }
        // fullnameRef.current.value = response.data.users[0].displayName;
        // profile_photo_urlRef.current.value = response.data.users[0].photoUrl;
        console.log("Email verification is send!");
        //alert("User details fetched!");
      }
    } catch (error) {
      console.log(error);
      //alert(error.response.data.error.message);
    }
  };

  const checkEmailVerification = async () => {
    try {
      const key = import.meta.env.VITE_FIREBASE_APP_ID;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );

      if (response.status === 200) {
        // console.log(response);
        console.log("email", response.data.emailVerified);
        if (response.data.emailVerified === true) {
          setEmailVerfied(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkEmailVerification();
  }, []);

  return (
    <>
      <h1>Welcome to Expense Tracker</h1>
      <p>Your Profile is incomplete </p>
      <Link to="/update_profile">Complete Now</Link>
      <p>Your email is {emailVerified ? "verified" : "not verified"}</p>
      {!emailVerified && (
        <Button variant="primary" onClick={sendEmailVerification}>
          Verify Email
        </Button>
      )}
      <Link to="/add_expense">Add Expense</Link>
    </>
  );
}

export default Profile;
