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

app.get("/", (req, res) => {
  res.send("WELCOME TO MERCURY API!");
});

// Route Middlewares
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/files", require("./routes/files"));

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    error: {
      message: "Invalid endpoint",
    },
  });
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    status: "error",
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
