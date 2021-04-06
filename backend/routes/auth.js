const express = require("express");
const {logout, signup, login} = require("../controllers/auth");
const {validateInfo, validateCredentials} = require("../functions/functions");

const router = express.Router();

router.get("/logout" ,logout);

router.post("/signup" , validateInfo, signup);

router.post("/login" , validateCredentials ,login);


module.exports = router;
