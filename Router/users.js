const express = require("express");
const { registerUserPost, loginUserPost } = require("../Controller/usersController");

const authinticate = require("../middelware/authinticate");

const router = express.Router();

router.post("/register",registerUserPost);

router.post("/login",loginUserPost);

router.get('/private',authinticate,(req,res)=>{
    console.log(req.user)
    res.status(200).json("this is private Router")
})

module.exports = router;
