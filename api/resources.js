const { Router } = require("express");
const { Resource, Field } = require("../adapters/resources");

const router = Router();

router.get("/", (req, res) =>
  Resource.find()
    .populate("fields")
    .then((e) => res.json(e))
);

router.post("/", async (req, res) => {
  const { name, fields } = req.body;
  const fieldIds = await Promise.all(
    fields.map((field) => Field.create(field))
  );
  const resource = await Resource.create({ name, fields: fieldIds });
  res.json(resource);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const resource = await Resource.findById(id).populate("fields");
  res.json(resource);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, fields } = req.body;
  const fieldIds = await Promise.all(
    fields.map((field) => Field.create(field))
  );
  const resource = await Resource.findByIdAndUpdate(id, {
    name,
    fields: fieldIds,
  });
  res.json(resource);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Resource.findByIdAndDelete(id);
  res.status(201).send();
});

module.exports = { router };
