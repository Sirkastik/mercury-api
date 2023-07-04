const Joi = require("joi");

module.exports = { createSchema, schemer };

function createSchema(entity) {
  return Joi.object(
    Object.entries(entity.schema)
      .map(([key, field]) => {
        const { type, isArray, required } = field.type;
        const typeDef = isArray ? Joi.array().items(Joi[type]()) : Joi[type]();
        return { [key]: required ? typeDef.required() : typeDef };
      })
      .reduce((o, field) => ({ ...o, ...field }), {})
  );
}

function schemer() {
  const schema = {
    type: "string",
    isArray: false,
    required: false,
    ref: null,
  };
  return {
    get type() {
      return schema;
    },
    string() {
      schema.type = "string";
      return this;
    },
    number() {
      schema.type = "number";
      return this;
    },
    ref(scheme) {
      schema.ref = scheme;
      return this;
    },
    required() {
      schema.required = true;
      return this;
    },
    array() {
      schema.isArray = true;
      return this;
    },
  };
}
