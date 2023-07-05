const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = { createRepo };

function createRepo(entity) {
  const schemaDefinition = Object.entries(entity.schema)
    .map(([key, field]) => {
      const { type: typeDef, isArray, required, ref } = field.type;
      const type = getType(ref || typeDef);
      const typeObj = {
        type,
        ...(required && { required }),
        ...(ref && { ref }),
      };
      return { [key]: isArray ? [typeObj] : typeObj };
    })
    .reduce((o, field) => ({ ...o, ...field }), {});
  return mongoose.model(
    entity.name,
    new Schema(schemaDefinition, {
      timestamps: true,
    })
  );
}

function getType(typeDef) {
  switch (typeDef) {
    case "string":
      return String;
    case "number":
      return Number;
    case "boolean":
      return Boolean;
    default:
      return mongoose.SchemaTypes.ObjectId;
  }
}
