const createResource = require("../../entities/resource");

module.exports = useAddResource;

function useAddResource({ resourcesRepo }) {
  return async function addResource({ name, fields }) {
    const resource = createResource({ name, fields });
    const exists = await resourcesRepo.findByName(name);
    if (exists) return exists;
    return resourcesRepo.insert({
        id: resource.getId(),
        name: resource.getName(),
        fields: resource.getFields(),
    });
  };
}
