import mongoose from "mongoose";

async function dbConnection(){
    return mongoose.connect(process.env.MONGODB_URI) // Use process.env.MONGODB_URI
  
}

export default dbConnection;