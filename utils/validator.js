const Joi = require("joi");

module.exports = { createSchema, schemer };

function createSchema({ fields }) {
  return Joi.object(
    fields
      .map(({ name, type, array, required }) => {
        return { [name]: withRequired(getType(type, array), required) };
      })
      .reduce((o, field) => ({ ...o, ...field }), {})
  );
}

function getType(type, array) {
  return array ? Joi.array().items(Joi[type]()) : Joi[type]();
}

function withRequired(type, required) {
  return required ? type.required() : type;
}

function schemer() {
  const schema = {
    type: "string",
    array: false,
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
    boolean() {
      schema.type = "boolean";
      return this;
    },
    date() {
      schema.type = "date";
      return this;
    },
    object() {
      schema.type = "object";
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
      schema.array = true;
      return this;
    },
  };
}
