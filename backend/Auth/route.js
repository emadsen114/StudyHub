const express = require("express")
const cookieParser = require("cookie-parser")
const router = express.Router()
router.use(cookieParser())
const { register, login, update, deleteUser, getUsers, currentUser, createPost, getPost, updatePost, getAllPosts, deletePost, updateSaveList } = require("./auth");
const { adminAuth } = require("../middleware/auth")
router.route("/update").put(adminAuth, update)
router.route("/deleteUser").delete(adminAuth, deleteUser)
router.route("/register").post(register)
//module.exports = router
router.route("/login").post(login);
//router.route("/update").put(update);
router.route("/deleteUser").delete(deleteUser);
router.route("/getUsers").get(getUsers);
router.route("/currentUser").get(currentUser);
router.route("/createPost").post(createPost);
router.route("/getPost/:id").get(getPost);
router.route("/updatePost/:id").patch(updatePost);
router.route("/getAllPosts").get(getAllPosts);
router.route("/deletePost/:id").delete(deletePost);
router.route("/updateSaveList/:id/:postId/:add").get(updateSaveList);

module.exports = router
