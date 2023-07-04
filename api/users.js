module.exports = (schema) => ({
  firstName: schema().string().required(),
  lastName: schema().string(),
  email: schema().string().required(),
  passwordHash: schema().string().required(),
});
