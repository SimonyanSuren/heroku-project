const router = require("express").Router();
const FavouritePostController = require("../../controllers/favoritePosts.controller");

router.get("/getAll", FavouritePostController.findAll);
router.get("/get", FavouritePostController.getPosts);
router.get("/search", FavouritePostController.searchPost);

router.post("/addToFavourites", FavouritePostController.addToFavourites);
router.delete("/remove/:id", FavouritePostController.removeFromFavourites);

module.exports = router;
