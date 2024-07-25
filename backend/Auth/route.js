const express = require("express")
const router = express.Router()
const { register, login, update, deleteUser, getUsers } = require("./auth");
const { adminAuth } = require("../middleware/auth")
router.route("/update").put(adminAuth, update)
router.route("/deleteUser").delete(adminAuth, deleteUser)
router.route("/register").post(register)
module.exports = router
router.route("/login").post(login);
router.route("/update").put(update);
router.route("/deleteUser").delete(deleteUser);
router.route("/getUsers").get(getUsers);


