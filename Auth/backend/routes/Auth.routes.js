const express = require("express");

const router = express.Router();

const { registerUser , loginUser , getUserProfile , logoutUser} = require("../controllers/Auth.controller");

const authMiddleware = require("../middleware/Auth.middleware");


router.post("/register" ,registerUser);
router.post("/login" , loginUser)

router.get("/get-profile" , authMiddleware , getUserProfile);
router.delete("/logout-user" , authMiddleware, logoutUser);

module.exports = router;