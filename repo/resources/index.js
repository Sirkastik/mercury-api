const useDB = require("../../adapters/kv");

const useResourcesRepo = require("./resources-repo");

const resourceMap = {};

function onGetAll(resources) {
  for (const r of resources) {
    resourceMap[r.name] = r;
  }
}

function onAdd(resource) {
  resourceMap[resource.name] = resource;
}

function onDelete(resource) {
  delete resourceMap[resource.name];
}

function onUpdate(resource) {
  resourceMap[resource.name] = resource;
}

const resourcesRepo = useResourcesRepo({
  useDB,
  onGetAll,
  onAdd,
  onDelete,
  onUpdate,
});

module.exports = { resourcesRepo, resourceMap };
