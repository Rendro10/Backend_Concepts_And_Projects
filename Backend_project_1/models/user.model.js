import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true,
  },
  secondName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    lowercase: true
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
    // required: true
  },
  password:{
    type:String,
  }
});

const User = mongoose.model("User", userSchema);

export default User;
