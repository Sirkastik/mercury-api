const fs = require("fs");
const path = require("path");
const { schemer } = require("../utils/validator");

const entities = [];

fs.readdirSync(__dirname)
  .filter((filename) => !filename.includes("index") && filename.endsWith(".js"))
  .forEach((filename) => {
    const name = filename.split(".")[0];
    const schema = require(path.join(__dirname, filename))(schemer);
    entities.push({ name, schema });
  });

module.exports = entities;
