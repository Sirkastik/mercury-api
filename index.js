require("dotenv").config();
require("./repositories").setup();
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 1337;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:3000"],
  })
);

// Route Middlewares
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
