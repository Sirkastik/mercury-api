const User = require("../repositories/user");

module.exports = {
  fetchUsers,
};

async function fetchUsers(req, res) {
  const users = await User.find();
  res.json(users);
}
