const express = require("express");
const { Router } = express;
const User = require("../models/user.model.js");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("Signin");
});

router.get("/signup", (req, res) => {
  return res.render("Signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    // const { fullName } = await User.findOne({ email });
    // console.log(fullName); 
    const token = await User.matchPassword(email, password);
    res.cookie("token", token);
    
    return res.redirect("/");  
  } catch (error) {
    return res.render("Signin", {
      error: "Incorrect Email Id or Password. Please try again with correct email id and password!!",
    });
  }
});


router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("An error occurred while creating the user.");
  }
});


router.get("/logout",(req,res)=>{
  res.clearCookie('token').redirect("/");
})

module.exports = router;
