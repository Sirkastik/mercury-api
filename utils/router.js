const { Router } = require("express");
const { createRepo } = require("./repo");
const { createSchema } = require("./validator");
const { validate } = require("../middleware/validate");

module.exports = { createRouter };

function createRouter(entity) {
  if (entity.schema.hasOwnProperty("router")) return entity.schema.router;
  const Repo = createRepo(entity);
  const schema = createSchema(entity);
  return Router()
    .get("/", async (req, res) => Repo.find().then((e) => res.json(e)))
    .get("/:id", async (req, res) =>
      Repo.findById(req.param.id).then((e) => res.json(e))
    )
    .post("/", validate(schema), async (req, res) =>
      Repo.create(req.body).then((e) => res.json(e))
    )
    .put("/:id", validate(schema), async (req, res) =>
      Repo.findByIdAndUpdate(req.params.id, req.body).then((e) => res.json(e))
    )
    .delete("/:id", async (req, res) =>
      Repo.findByIdAndDelete(req.params.id).then(() => res.status(201).send())
    );
}
