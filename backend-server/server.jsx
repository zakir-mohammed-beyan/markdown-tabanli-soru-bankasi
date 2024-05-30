const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const validUsernames = ["iamzakir", "user123", "admin", "iamarman"];

app.post("/validate-username", (req, res) => {
  const { username } = req.body;
  console.log("Received username:", username);
  if (validUsernames.includes(username)) {
    res.json({ isValid: true });
  } else {
    res.json({ isValid: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
