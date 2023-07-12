const { kv } = require("@vercel/kv");

module.exports = { fetchResources };

async function fetchResources() {
  const resourceIds = await kv.get("sys_resources_ids");
  return await Promise.all(
    (resourceIds || []).map(async (id) => kv.get(`sys_resources_${id}`))
  );
}
