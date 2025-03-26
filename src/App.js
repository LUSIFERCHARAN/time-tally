import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Login from "./pages/Login";
import Profile from "./pages/Profile"; // Import Profile page
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [timers, setTimers] = useState(() => {
    return JSON.parse(localStorage.getItem("timers")) || [];
  });

  const [newTimerLabel, setNewTimerLabel] = useState("");
  const [showProfile, setShowProfile] = useState(false); // State for profile page

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  const addTimer = () => {
    if (newTimerLabel.trim() !== "") {
      setTimers([...timers, { id: Date.now(), label: newTimerLabel }]);
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

  return (
    <div className="app-container">
      {isLoggedIn ? (
        showProfile ? (
          <Profile setShowProfile={setShowProfile} /> // Pass prop to go back
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
                <Timer key={timer.id} id={timer.id} label={timer.label} onDelete={deleteTimer} />
              ))}
            </div>
          </>
        )
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
