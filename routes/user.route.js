const express = require("express");
// import express from "express";
const router = express.Router();
const userController = require("../controllers/user.controller");
// import {
//   deleteAUser,
//   getAllUsers,
//   getRandomUser,
//   saveAUser,
//   updateAUser,
//   updateBulkUser,
// } from "../controllers/user.controller.js";

router.route("/random").get(userController.getRandomUser);
router.route("/all").get(userController.getAllUsers);
router.route("/save").post(userController.saveAUser);
router.route("/update").patch(userController.updateAUser);
router.route("/bulk-update").patch(userController.updateBulkUser);
router.route("/delete/:id").delete(userController.deleteAUser);

module.exports = router;
