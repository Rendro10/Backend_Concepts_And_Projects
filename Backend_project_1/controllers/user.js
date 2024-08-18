import User from "../models/user.model.js";

async function getAllUser(req,res) {
  const allUser = await User.find({});
//   const html = `<ul>${allUser
//     .map((user) => `<li>${user.firstName} and ${user.email}</li>`)
//     .join("")}<ul>`;
//   res.send(html);
    res.send(allUser)
}

async function getUserById(req,res){
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json("User Not Found!!");
    }
    return res.json(user);
}

async function updateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,({lastName:"Last Name is Succesfully Changed"}))
    return res.status(200).json({ status: "Success" });
}

async function deleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: "Succesfully deleted" });
}

async function createUser(req,res){
    const body = req.body;
  
  if(!body || !body.firstName || !body.secondName || !body.email || !body.gender || !body.jobTitle){
    return res.status(400).json({msg: "All fields are required!"})
  }

  const result = await User.create({
    firstName:body.firstName,
    lastName:body.secondName,
    email:body.email,
    gender:body.gender,
    jobTitle:body.jobTitle,
    password:body.password
  })
  return res.status(201).json({msg:"Success!",id:res._id});
}

async function authenticateUser(req, res) {
    try {
        const { email, password } = req.body;
        
        // Find user by email Id
        const user = await User.findOne({ email });

        // Check if user exists and compare passwords
        if (user && user.password === password) {
            res.status(200).send("Login is done successfully!!");
        } else {
            res.status(401).send("Incorrect email or password");
        }
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).send("Internal Server Error");
    }
}

export { getAllUser, getUserById, updateUserById, deleteUserById, createUser, authenticateUser };
