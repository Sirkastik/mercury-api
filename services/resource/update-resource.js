const createResource = require("../../entities/resource");

module.exports = useUpdateResource;

function useUpdateResource({ resourcesRepo }) {
  return async function updateResource(id, { name, fields }) {
    const resource = createResource({ id, name, fields });
    const exists = await resourcesRepo.findByName(name);
    if (!exists) return;
    return resourcesRepo.update({
        id: resource.getId(),
        name: resource.getName(),
        fields: resource.getFields(),
    });
  };
}
