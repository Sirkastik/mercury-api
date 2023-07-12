const { Router } = require("express");
const { createRepo } = require("./repo");
const { createSchema } = require("./validator");
const { validate } = require("../middleware/validate");
const {
  getHandler,
  getOneHandler,
  postHandler,
  putHandler,
  deleteHandler,
} = require("./handler");

module.exports = { createRouter };

function createRouter(resource) {
  const Repo = createRepo(resource);
  const schema = createSchema(resource);
  return Router()
    .get("/", getHandler(Repo))
    .post("/query", getHandler(Repo))
    .get("/:id", getOneHandler(Repo))
    .post("/", validate(schema), postHandler(Repo))
    .put("/:id", validate(schema), putHandler(Repo))
    .delete("/:id", deleteHandler(Repo));
}
