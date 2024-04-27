import React from "react";
import { Link, useHistory } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

function Profile() {
  return (
    <>
      <h1>Welcome to Expense Tracker</h1>
      <p>Your Profile is incoplete </p>
      <Link to="/update_profile">Complete Now</Link>
    </>
  );
}

export default Profile;
