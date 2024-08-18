const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const app = express();
const dbConnection = require("./db/index.db");
const cookieParser = require("cookie-parser");

const Blog = require('./models/blog.model');


dotenv.config({
    path: "./.env"
})

const userRoute = require("./routes/user.router");
const blogRoute = require("./routes/blog.router");
const { checkForAuthenticationCookie } = require("./middlewares/authentication.middleware");
const User = require("./models/user.model");

app.set("view engine","ejs");
app.set("views", path.resolve('./views'))

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))
app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.get("/", async (req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render("Home",{
        user: req.user,
        blogs: allBlogs,
    });
})


// Mongo DB Db connection 
dbConnection();

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`App is listening on port: ${process.env.PORT}`);
})