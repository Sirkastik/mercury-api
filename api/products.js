module.exports = (schema) => ({
  title: schema().string().required(),
  price: schema().string().required(),
  description: schema().string(),
  categories: schema().array().ref("categories"),
  images: schema().array().string(),
});
