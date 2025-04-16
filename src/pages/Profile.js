import React from "react";

export default function Profile({ setShowProfile }) {
  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      <p>Welcome to your profile!</p>
      <button onClick={() => setShowProfile(false)}>Back to Home</button>
    </div>
  );
}
