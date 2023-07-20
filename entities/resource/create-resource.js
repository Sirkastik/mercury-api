module.exports = useCreateResource;

function useCreateResource({ Id, createField }) {
  return function createResource({ id = Id.createId(), name, fields }) {
    if (!Id.isCuid(id)) throw new Error("Resource must have a valid id");
    if (!name) throw new Error("Resource must have a name");
    if (!fields) throw new Error("Resource must have fields");
    if (!Array.isArray(fields)) {
      throw new Error("Resource fields must be an array");
    }
    if (!fields.length) {
      throw new Error("Resource must have at least one field");
    }
    const fieldsToCreate = fields.map(createField);

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getFields: () => fieldsToCreate,
    });
  };
}
