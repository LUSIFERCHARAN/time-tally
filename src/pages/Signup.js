import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Assuming the same styles for signup as login

export default function Signup({ setShowSignup, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", { email, password });
      if (res.data.success) {
        alert("Signup successful! Please login.");
        setShowSignup(false); // Redirect back to login after successful signup
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="signup-container">
      <h2>📝 Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setShowSignup(false)}
        >
          Login
        </span>
      </p>
    </div>
  );
}
