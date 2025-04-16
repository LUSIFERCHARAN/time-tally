import React, { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoggedIn, setShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{" "}
        <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setShowSignup(true)}>
          Sign up
        </span>
      </p>
    </div>
  );
}
