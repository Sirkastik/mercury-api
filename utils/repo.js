const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = { createRepo };

function createRepo(entity) {
  const schemaDefinition = Object.entries(entity.schema)
    .map(([key, field]) => {
      const { type: typeDef, isArray, required, ref } = field.type;
      let type = String;
      switch (typeDef) {
        case "string":
          type = String;
          break;
        case "number":
          type = Number;
          break;
        default:
          break;
      }
      ref && (type = mongoose.SchemaTypes.ObjectId);
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
