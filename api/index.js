const fs = require("fs");
const path = require("path");
const { schemer } = require("../utils/validator");

module.exports = getEntities;

async function getEntities() {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, files) => {
      const entities = files
        .filter(
          (filename) => !filename.includes("index") && filename.endsWith(".js")
        )
        .map((filename) => {
          const name = filename.split(".")[0];
          const schema = require(path.join(__dirname, filename))(schemer);
          return { name, schema };
        });
      resolve(entities);
    });
  });
}
