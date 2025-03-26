import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./Signup.css";

export default function Signup({ setShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Signup successful! You can now log in.");
      setShowSignup(false);
    } catch (error) {
      alert("❌ Signup failed: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>📝 Sign Up</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
      <p>Already have an account? <span onClick={() => setShowSignup(false)}>Log in</span></p>
    </div>
  );
}
