module.exports = useResourcesRepo;

function useResourcesRepo({ useDB, onAdd, onDelete, onUpdate, onGetAll }) {
  const table = "resources";
  const db = useDB(table);

  return Object.freeze({
    insert,
    findById,
    findByName,
    findAll,
    update,
    remove,
  });

  async function insert(resource) {
    const created = await db.insert(resource);
    onAdd(created);
    return created;
  }

  async function findById(id) {
    return await db.findById(id);
  }

  async function findAll() {
    const found = await db.findAll();
    onGetAll(found);
    return found;
  }

  async function findByName(name) {
    const resources = await db.findAll();
    return resources.find((r) => r.name === name);
  }

  async function update(resource) {
    const updated = await db.update(resource);
    onUpdate(updated);
    return updated;
  }

  async function remove(id) {
    const deleted = await db.remove(id);
    onDelete(deleted);
    return deleted;
  }
}
