const { Router } = require("express");
const fs = require("fs");
const path = require("path");

const router = Router();

fs.readdirSync(__dirname)
  .filter((filename) => !filename.includes("index") && filename.endsWith(".js"))
  .forEach((filename) => {
    const routeNode = require(path.join(__dirname, filename));
    router.use(
      `/${routeNode.resource || filename.split(".")[0]}`,
      routeNode.router
    );
  });

module.exports = router;
