const Joi = require("joi");

const createProduct = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  price: Joi.string().required(),
  description: Joi.string(),
  category: Joi.array().items(Joi.string()),
  images: Joi.array().items(Joi.string()),
});

const updateProduct = Joi.object({
  title: Joi.string().min(3).max(30),
  price: Joi.number().min(0),
  images: Joi.array().items(Joi.string()),
});

module.exports = {
  validateSchema,
  createProduct,
  updateProduct,
};

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    next();
  };
}
