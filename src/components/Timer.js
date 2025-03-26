import React, { useState, useEffect } from "react";
import "./Timer.css";

export default function Timer({ id, label, onDelete }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const startTimer = () => {
    if (!isRunning) {
      const id = setInterval(() => setTime((prev) => prev + 1), 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="timer-card">
      <h3>{label}</h3>
      <p>{Math.floor(time / 60)}:{("0" + (time % 60)).slice(-2)}</p>
      <div className="timer-buttons">
        {!isRunning ? (
          <button onClick={startTimer}>▶ Start</button>
        ) : (
          <button onClick={pauseTimer}>⏸ Pause</button>
        )}
        <button onClick={resetTimer}>🔄 Reset</button>
        <button onClick={() => onDelete(id)}>❌ Delete</button>
      </div>
    </div>
  );
}
