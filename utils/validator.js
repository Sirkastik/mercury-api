const Joi = require("joi");

module.exports = { createSchema, schemer };

function createSchema(entity) {
  return Joi.object(
    Object.entries(entity.schema)
      .map(([key, field]) => {
        const { type, isArray, required } = field.type;
        const schema = withRequired(getType(type, isArray), required);
        return { [key]: schema };
      })
      .reduce((o, field) => ({ ...o, ...field }), {})
  );
}

function getType(type, isArray) {
  return isArray ? Joi.array().items(Joi[type]()) : Joi[type]();
}

function withRequired(type, required) {
  return required ? type.required() : type;
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
