const { Router } = require("express");
const UserService = require("../services/user");

const router = Router();

router.get("/", UserService.fetchUsers);

router.get("/:id", UserService.fetchUserById);

router.post("/", UserService.createUser);

router.put("/:id", UserService.updateUser);

router.delete("/:id", UserService.deleteUser);

module.exports = { router };
