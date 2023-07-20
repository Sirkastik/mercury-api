const { Router } = require("express");
const resourceService = require("../services/resource");
const { createRepo } = require("../utils/repo");

const router = Router();

router.get("/", async (req, res) => {
  const resources = await resourceService.getResources();
  res.json(resources);
});

router.post("/", async (req, res) => {
  const resource = await resourceService.addResource(req.body);
  res.json(resource);
  createRepo(resource);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const resource = await resourceService.getResource({ id });
  if (!resource) res.status(404).json({ error: "Resource not found" });
  res.json(resource);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const resource = await resourceService.updateResource(id, req.body);
  res.json(resource);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await resourceService.deleteResource(id);
  res.status(204).send();
});

module.exports = { router };
