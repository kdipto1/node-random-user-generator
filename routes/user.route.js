const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.route("/random").get(userController.getRandomUser);
router.route("/all").get(userController.getAllUsers);
router.route("/save").post(userController.saveAUser);
router.route("/update").patch(userController.updateAUser);
router.route("/bulk-update").patch(userController.updateBulkUser);
router.route("/delete").delete(userController.deleteAUser);

module.exports = router;
