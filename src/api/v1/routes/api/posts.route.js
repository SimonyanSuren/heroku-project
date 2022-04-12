const express = require("express");
const router = express.Router();
const PostsController = require("../../controllers/posts.controller");

const {
  authenticateUser,
} = require("../../middleware/authentication.middleware");

router.get("/getAll", PostsController.getAllPosts);
router.get("/get/:uuid", PostsController.getEachPost);
router.get("/search", PostsController.searchPosts);
router.get("/get", PostsController.getPostsWithQuery);
//router.get('/favorite/:uuid', PostsController.changeFavByUuid)

router.post("/fetch", PostsController.fetchPosts);
router.post("/create", authenticateUser, PostsController.createPost);

router.delete("/delete/:uuid", authenticateUser, PostsController.deletePost);
router.patch("/edit", authenticateUser, PostsController.editPost);

module.exports = router;
