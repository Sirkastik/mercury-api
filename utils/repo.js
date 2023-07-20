const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = { createRepo };

function createRepo({ name, fields }) {
  const repo = mongoose.models[name]
  if (repo) return repo;
  const schemaDefinition = fields
    .map(({ name, type, array, required, ref }) => {
      const o = {
        type: getType(ref || type),
        ...(required && { required }),
        ...(ref && { ref }),
      };
      return { [name]: array ? [o] : o };
    })
    .reduce((o, field) => ({ ...o, ...field }), {});
  return mongoose.model(
    name,
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
    case "date":
      return Date;
    case "object":
      return Object;
    default:
      return mongoose.SchemaTypes.ObjectId;
  }
}
