import React, { useRef, useState, useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UpdateProfile() {
  const fullnameRef = useRef(null);
  const profile_photo_urlRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const history = useHistory();

  const fetchUserInfo = async () => {
    try {
      const key = import.meta.env.VITE_FIREBASE_APP_ID;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,
        {
          idToken: token,
        }
      );

      if (response.status === 200) {
        //console.log(response.data.users[0].displayName);
        if (
          response.data.users[0].displayName &&
          response.data.users[0].photoUrl
        ) {
          setComplete(true);
          fullnameRef.current.value = response.data.users[0].displayName;
          profile_photo_urlRef.current.value = response.data.users[0].photoUrl;
          console.log("User details fetched!");
        }

        //alert("User details fetched!");
      }
    } catch (error) {
      console.log(error.response.data.error.message);
      alert(error.response.data.error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullname = fullnameRef.current.value;
    const profile_photo_url = profile_photo_urlRef.current.value;

    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
        {
          idToken: token,
          displayName: fullname,
          photoUrl: profile_photo_url,
          returnSecureToken: true,
        }
      );

      if (response.status === 200) {
        console.log(response);
        //authCtx.login(response.data.idToken);
        console.log("User details updated successfully!");
        alert("User details updated successfully!");
        //history.push("/profile");
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

    fullnameRef.current.value = "";
    profile_photo_urlRef.current.value = "";
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Profile is {complete ? "complete" : "incomplete"}</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card style={{ padding: "20px", maxWidth: "400px" }}>
          <h2>Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname">Full Name:</label>
              <input type="text" id="fullname" ref={fullnameRef} required />
            </div>
            <div>
              <label htmlFor="profile_photo_url">Profile Photo URL:</label>
              <input
                type="text"
                id="profile_photo_url"
                ref={profile_photo_urlRef}
                required
              />
            </div>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default UpdateProfile;
