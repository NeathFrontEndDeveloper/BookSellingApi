import express from "express";
import connectDB from "@/config/database";
import Router from "@/routes/index";

const app = express();

// Enable JSON parsing for request body
app.use(express.json());

// Enable URL-encoded parsing with extended mode
app.use(express.urlencoded({ extended: true }));

// Root route — shows message when visiting http://localhost:4000
app.get("/", (req, res) => {
  res.send("Server is running on port 4000 🚀");
});

// Use your main router
app.use("/api", Router);

// Connect to database
connectDB();

// Start server
app.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
