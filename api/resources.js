const _ = require("lodash");
const { Router } = require("express");
const { kv } = require("@vercel/kv");
const { createId } = require("@paralleldrive/cuid2");

const { fetchResources } = require("../adapters/resources");

const router = Router();

router.get("/", async (req, res) => {
  const resources = await fetchResources();
  res.json(resources);
});

router.post("/", async (req, res) => {
  const id = createId();
  const resource = { ...req.body, id };
  const idsResponse = await kv.get("sys_resources_ids");
  await saveResource(resource);
  await saveResourceIds([...(idsResponse || []), id]);
  res.json(resource);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const resource = await kv.get(`sys_resources_${id}`);
  if (!resource) res.status(404).json({ error: "Resource not found" })
  res.json(resource);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const resource = await kv.get(`sys_resources_${id}`);
  if (!resource) res.status(404).json({ error: "Resource not found" })
  await saveResource({ ..._.merge(req.body, resource), id });
  res.json(resource);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const resourceIds = await kv.get("sys_resources_ids");
  await saveResourceIds((resourceIds || []).filter((r) => r !== id));
  await kv.del(`sys_resources_${id}`);
  res.status(204).send();
});

module.exports = { router };

function saveResource(resource) {
  return kv.set(`sys_resources_${resource.id}`, JSON.stringify(resource));
}

function saveResourceIds(resourceIds) {
  return kv.set("sys_resources_ids", JSON.stringify(resourceIds));
}
