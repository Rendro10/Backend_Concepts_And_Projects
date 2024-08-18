const JWT = require("jsonwebtoken");

const secret = "@IamArKAMukhErJee#1913";

function createTokenForUSer(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };

    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}


module.exports ={
    createTokenForUSer,
    validateToken
}