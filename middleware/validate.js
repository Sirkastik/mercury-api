const Joi = require("joi");

const resourceSchema = Joi.object({
  name: Joi.string().required(),
  fields: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        required: Joi.boolean(),
        array: Joi.boolean(),
        ref: Joi.string(),
      })
    )
    .required(),
});

module.exports = { validate, resourceSchema };

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    next();
  };
}
