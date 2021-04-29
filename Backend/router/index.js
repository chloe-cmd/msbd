// import router
const router = require("express").Router();
// import controller
const fichesController = require("../controller/Fiches");
const categoriesController = require("../controller/Categories");
const productsController = require("../controller/Products");
const wishlistController = require("../controller/Wishlist");
// Fiches Routes
router.route("/fiches").get(fichesController.index).post(fichesController.add);
router.route("/fiche/:id").delete(fichesController.delete);
router.route("/updateFiche/:id").put(fichesController.update);
router.route("/fiches/:categorieId").get(fichesController.getByCategories);
router.route("/fiche/:id").get(fichesController.getOne);
// Categories Routes
router.route("/categories").get(categoriesController.index);
router.route("/categorie/:id").get(categoriesController.getOne);
// Products Routes
router.route("/products").get(productsController.index);
router.route("/product/:id").get(productsController.getOne);
// Wishlist Routes
router
  .route("/wishlist")
  .get(wishlistController.index)
  .post(wishlistController.add);
router.route("/wishlist/:id").delete(wishlistController.delete);
router.route("/wishlist/:id").get(wishlistController.getOne);

module.exports = router;
