const User = require("../models/user.model");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth");

async function userSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password
  });

  return res.redirect("/");
}

async function userLogin(req,res){
    const { email, password} = req.body;
    const user = await User.findOne({email, password });
    // const username = user ? user.name : Sir;
    // console.log("User is ",user);
    if(!user){
        return res.render('login',{
          error: "Invalid Username or Password"
        });  
    }

    const token = setUser(user);
    res.cookie("token",token);

    return res.render("home",{ username: user.name });
}





module.exports ={
    userSignup,
    userLogin
}
