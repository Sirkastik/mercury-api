require("dotenv").config();
require("./repositories").setup();
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:3000"],
  })
);

app.get("/", (req, res) => res.send("WELCOME TO MERCURY API!"));

app.use("/api", require("./routes"));

app.use((req, res) => res.status(404).json({ message: "Invalid endpoint" }));

app.use((err, req, res) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
