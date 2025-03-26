import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Signup from "./Signup";
import "./Login.css";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (error) {
      alert("❌ Login failed: " + error.message);
    }
  };

  return (
    <>
      {showSignup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <div className="login-container">
          <h2>🔐 Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>Don't have an account? <span onClick={() => setShowSignup(true)}>Sign up</span></p>
        </div>
      )}
    </>
  );
}
