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
    .get("/", async (req, res) => {
      const result = await Repo.find();
      res.json(result);
    })
    .get("/:id", async (req, res) => {
      const result = await Repo.findById(req.param.id);
      res.json(result);
    })
    .post("/", validate(schema), async (req, res) => {
      const result = await Repo.create(req.body);
      res.json(result);
    })
    .put("/:id", validate(schema), async (req, res) => {
      const result = await Repo.findByIdAndUpdate(req.params.id, req.body);
      res.json(result);
    })
    .delete("/:id", async (req, res) => {
      await Repo.findByIdAndDelete(req.params.id);
      res.status(201);
    });
}
