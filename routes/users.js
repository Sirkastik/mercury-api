const { Router } = require("express");
const UserService = require("../services/user");

const router = Router();

router.get("/", UserService.fetchUsers);

module.exports = router;
