const {getUser} = require("../service/auth")


function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie){
        return next();
    }
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();

}

function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) {
            // If user is not authenticated, redirect to login page
            return res.redirect("/login");
        }

        if (!roles.includes(req.user.role)) {
            // If user role is not allowed, return Unauthorized
            return res.status(403).send("Unauthorized");
        }

        // User is authenticated and has the required role, proceed
        return next();
    };
}

module.exports={
    checkForAuthentication,
    restrictTo
}