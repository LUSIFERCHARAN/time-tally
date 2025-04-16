import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Login from "./pages/Login";
import Profile from "./pages/Profile"; // Import Profile page
import Signup from "./pages/Signup"; // Make sure to import the Signup component
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [showSignup, setShowSignup] = useState(false); // State for showing the Signup page
  const [timers, setTimers] = useState(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timers")) || [];
    return savedTimers.map((timer) => ({
      ...timer,
      elapsedTime: Date.now() - timer.startTime,
    }));
  });

  const [newTimerLabel, setNewTimerLabel] = useState("");

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  const addTimer = () => {
    if (newTimerLabel.trim() !== "") {
      const newTimer = {
        id: Date.now(),
        label: newTimerLabel,
        startTime: Date.now(),
        elapsedTime: 0,
      };
      setTimers([...timers, newTimer]);
      setNewTimerLabel("");
    }
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const updateTimer = (id) => {
    const updatedTimers = timers.map((timer) => {
      if (timer.id === id) {
        return {
          ...timer,
          elapsedTime: Date.now() - timer.startTime,
        };
      }
      return timer;
    });
    setTimers(updatedTimers);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        showProfile ? (
          <Profile setShowProfile={setShowProfile} />
        ) : (
          <>
            <h1>⏳ Time Tally</h1>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
            <button className="profile-btn" onClick={() => setShowProfile(true)}>
              👤 Profile
            </button>
            <div className="add-timer">
              <input
                type="text"
                value={newTimerLabel}
                onChange={(e) => setNewTimerLabel(e.target.value)}
                placeholder="Enter task name"
              />
              <button onClick={addTimer}>➕ Add Timer</button>
            </div>
            <div className="timers-list">
              {timers.map((timer) => (
                <Timer
                  key={timer.id}
                  id={timer.id}
                  label={timer.label}
                  elapsedTime={timer.elapsedTime}
                  onDelete={deleteTimer}
                  onUpdate={updateTimer}
                />
              ))}
            </div>
          </>
        )
      ) : showSignup ? (
        <Signup setShowSignup={setShowSignup} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} />
      )}
    </div>
  );
}
