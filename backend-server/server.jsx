const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const validUsernames = ["zakir123", "user123", "admin", "arman456"];

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post("/validate-username", (req, res) => {
  const { username } = req.body;

  if (!username || typeof username !== "string") {
    return res
      .status(400)
      .json({
        error: "Geçersiz kullanıcı adı. Lütfen geçerli bir dize sağlayın.",
      });
  }

  const isValidUsername = validUsernames.includes(username);

  res.json({ isValid: isValidUsername });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "İç Sunucu Hatası" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
