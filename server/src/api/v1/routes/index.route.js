const router = require("express").Router();

const { authenticateUser } = require("../middleware/authentication.middleware");

const usersRouter = require("./api/users.route");
const postsRouter = require("./api/posts.route");
const commentsRouter = require("./api/comments.route");
const authRouter = require("./api/auth.route");
const favouritePostsRouter = require("./api/favoritePost.route");

router.use("/user", authenticateUser, usersRouter);
router.use("/posts", postsRouter);
router.use("/favoritePosts", authenticateUser, favouritePostsRouter);
router.use("/comments", commentsRouter);
router.use("/auth", authRouter);

module.exports = router;
