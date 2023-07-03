const Joi = require("joi");

const createProduct = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  price: Joi.string().required(),
  description: Joi.string(),
  categories: Joi.array().items(Joi.string()),
  images: Joi.array().items(Joi.string()),
});

const updateProduct = Joi.object({
  title: Joi.string().min(3).max(30),
  price: Joi.number().min(0),
  images: Joi.array().items(Joi.string()),
});

const productSchema = {
  create: createProduct,
  update: updateProduct,
}

const createCategory = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  image: Joi.string(),
});

const categorySchema = {
  create: createCategory,
  update: createCategory,
}

module.exports = {
  validateSchema,
  productSchema,
  categorySchema,
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
