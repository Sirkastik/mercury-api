module.exports = useCreateField;

function useCreateField({ Id }) {
  return function createField({
    id = Id.createId(),
    name,
    type,
    ref,
    array = false,
    required = false,
  }) {
    if (!Id.isCuid(id)) throw new Error("Field must have a valid id");
    if (!name) throw new Error("Field must have a name");
    if (!type) throw new Error("Field must have a type");
    if (type === "ObjectID" && !ref) {
      throw new Error("Field must have a valid reference");
    }
    
    return {
      id,
      name,
      type,
      ref,
      array,
      required,
    };
  };
}
