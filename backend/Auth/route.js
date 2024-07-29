const express = require("express")
const cookieParser = require("cookie-parser")
const router = express.Router()
router.use(cookieParser())
const { register, login, update, deleteUser, getUsers, currentUser } = require("./auth");
const { adminAuth } = require("../middleware/auth")
router.route("/update").put(adminAuth, update)
router.route("/deleteUser").delete(adminAuth, deleteUser)
router.route("/register").post(register)
//module.exports = router
router.route("/login").post(login);
router.route("/update").put(update);
router.route("/deleteUser").delete(deleteUser);
router.route("/getUsers").get(getUsers);
router.route("/currentUser").get(currentUser);

module.exports = router
