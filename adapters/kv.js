const { kv } = require("@vercel/kv");

module.exports = useDB;

function useDB(table) {
  return Object.freeze({
    insert,
    findById,
    findAll,
    update,
    remove,
  });

  async function insert(record) {
    await kv.set(getKey(record.id), stringify(record));
    updateRecordIds(record.id);
    return record;
  }

  async function findById(id) {
    return await kv.get(getKey(id));
  }

  async function findAll() {
    const recordIds = await getRecordsIds();
    return await Promise.all(recordIds.map(async (id) => kv.get(getKey(id))));
  }

  async function update(record) {
    await kv.set(getKey(record.id), stringify(record));
    return record;
  }

  async function remove(id) {
    const record = await kv.get(getKey(id));
    await kv.del(getKey(id));
    updateRecordIds(id, true);
    return record;
  }

  async function updateRecordIds(recordId, remove = false) {
    let recordIds = await getRecordsIds();
    if (remove) recordIds = recordIds.filter((id) => id !== recordId);
    else recordIds.push(recordId);
    await kv.set(`sys_${table}_ids`, recordIds);
  }

  async function getRecordsIds() {
    const recordIds = await kv.get(`sys_${table}_ids`);
    return recordIds || [];
  }

  function getKey(id) {
    return `sys_${table}_${id}`;
  }

  function stringify(object) {
    return JSON.stringify(object);
  }
}
