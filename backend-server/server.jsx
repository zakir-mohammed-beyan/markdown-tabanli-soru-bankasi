const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000; // Use environment variable or default to 5000

app.use(cors());
app.use(express.json());

const validUsernames = ["iamzakir", "user123", "admin", "iamarman"];

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Endpoint for validating usernames
app.post("/validate-username", (req, res) => {
  const { username } = req.body;

  // Validate username
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: "Invalid username. Please provide a valid string." });
  }

  // Check if the username is in the list of valid usernames
  const isValidUsername = validUsernames.includes(username);
  
  res.json({ isValid: isValidUsername });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
