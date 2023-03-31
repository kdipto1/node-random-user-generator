const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 * @Address : http://localhost:8000/user/random
 */
router.route("/random").get(userController.getRandomUser);

/**
 * @Address : http://localhost:8000/user/all
 * @or : http://localhost:8000/user/all?limit=16
 */
router.route("/all").get(userController.getAllUsers);

/**
 * @Address : http://localhost:8000/user/save
 * @Body data sample:-
 * {
    "name": "Socorro Saunders",
    "gender": "female",
    "address": "Helen, Tuvalu",
    "contact": 8956445641,
    "photoUrl": "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
}
Note: Id(Unique) will be automatically generated.
 */
router.route("/save").post(userController.saveAUser);

/** 
 * @Address : http://localhost:8000/user/update/1
 * @Body data sample:-
 * {
        "address": "Canada/Usa"
    }
 */
router.route("/update/:id").patch(userController.updateAUser);

/**
 * @Address : http://localhost:8000/user/bulk-update
 * @Body Data Sample:-
 * {
    "ids":[0,1],
    "details": {
        "address": "Canada/Usa"
    }
}
 */
router.route("/bulk-update").patch(userController.updateBulkUser);


/**
 * @Address : http://localhost:8000/user/delete/7
 */
router.route("/delete/:id").delete(userController.deleteAUser);

module.exports = router;
