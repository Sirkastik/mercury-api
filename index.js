require("dotenv").config();
require("./adapters/mongoose").connect();
const express = require("express");
const cors = require("cors");
const { createOrgRouter } = require("./utils/router");
const resourceService = require("./cases/resource");

(async () => {
  const resources = await resourceService.getResources();

  const app = express();

  const PORT = process.env.PORT || 5000;

  app.disable("x-powered-by");
  app.disable("etag");
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: [process.env.CLIENT_URL || "http://localhost:3000"],
    })
  );

  app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
  });

  app.get("/", (req, res) => res.send("WELCOME TO MERCURY API!"));

  app.use("/api/mercury", require("./api"));

  const organizations = [
    {
      name: "mercury",
      resources,
    },
  ];

  for (const org of organizations) {
    app.use("/api", createOrgRouter(org));
  }

  app.use(async (req, res) =>
    res.status(404).json({ message: "Invalid endpoint" })
  );

  app.use((err, req, res) => {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Server Error" });
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
