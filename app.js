require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello!");
});
app.use("/api/v1", require("./routes"));

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  const error = err.name || "ServerError";
  const message = err.message || "Internal server error";
  const status = err.statusCode || 500;

  res.status(status).json({ error, message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});