const jwt = require("jsonwebtoken");
const secret = "arka$123456@";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
  if (!token) {
    return null; // or throw an error indicating the token is missing
  }
  
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    // Handle JWT verification errors
    console.error("JWT verification failed:", error.message);
    return null; // or throw an error
  }
}

module.exports = {
  setUser,
  getUser,
};
