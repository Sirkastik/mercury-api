const User = require("../repositories/user");

module.exports = {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
};

async function fetchUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

async function fetchUserById(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
}

async function createUser(req, res) {
  const { body } = req;
  const user = await User.create(body);
  res.status(201).json(user);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { body } = req;
  const user = await User.update(id, body);
  res.json(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(204).end();
}