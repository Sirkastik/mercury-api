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
const { resourceMap } = require("../repo/resources");

module.exports = { createRouter, createOrgRouter };

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

function createOrgRouter(org) {
  const router = Router();
  router.all("/", (req, res, next) => {
    next();
  });
  for (const r of org.resources) {
    router.use(`/${org.name}/${r.name}`, createRouter(r));
  }
  router.use(`/${org.name}/*`, async (req, res, next) => {
    const resource = resourceMap[req.params[0]];
    if (!resource) return next();
    return createRouter(resource)(req, res, next);
  });
  return router;
}
