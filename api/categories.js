module.exports = (schema) => ({
  name: schema().string().required(),
  image: schema().string(),
});
