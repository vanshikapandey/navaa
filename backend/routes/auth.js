const express = require("express");
const {logout, signup, login} = require("../controllers/auth");

const router = express.Router();

router.get("/logout" ,logout);

router.post("/signup" , signup);

router.post("/login" , login);


module.exports = router;
