import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";  // Your auth routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // Middleware to parse JSON requests

// API Routes
app.use("/api/auth", authRoutes); // Prefix for your routes

// Test route to confirm API is running
app.get("/", (req, res) => {
  res.send("Backend is working 👋");
});

// Start server and MongoDB connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  mongoose
  .connect("mongodb+srv://lakshmanan1210:WWWTIMETALLY@time-tally-cluster.4cz2s9i.mongodb.net/time-tally?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
