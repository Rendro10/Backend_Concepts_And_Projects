const express = require('express');
const dotenv = require("dotenv");
const {connectMongoDB} = require("./db/index.db");
const URL = require("./models/url.model");
const app = express();
dotenv.config({
    path: "./.env",
});
const PORT = process.env.PORT || 8001;
const path = require("path");
const cookieParser = require("cookie-parser");
const {checkForAuthentication, restrictTo} = require('./middleware/auth');

const staticRoute = require("./routes/staticRouter");
const urlRoute = require('./routes/url.router');
const userRoute = require('./routes/userRouter');


// DB connection is here
try {
    connectMongoDB(process.env.MONGODB_URI);
    console.log("MongoDB is connected!!");
} catch (error) {
    console.log("Error while connecting mongoDB!",error);
}


// configured EJS here to make UI for frontend
app.set("view engine", "ejs");
// giving path to config frontend
app.set('views',path.resolve("./views"));


//  MiddleWare Section
// making the response to json using middleware
app.use(express.json());
// parse the body data to show using middleware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);
// respective path of the req to get response
app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

// To get the all urls
app.get("/test", async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls:allUrls
    });
});

app.get('/:shortId',async (req,res)=>{
    try {
        const shortId = req.params.shortId;
        // Find the URL document by shortId
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // Return the updated document
        );

        if (entry && entry.redirectUrl) {
            return res.redirect(entry.redirectUrl);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error("Error while redirecting:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT || 8001,()=>{
    console.log(`Server Started on port: ${PORT}`);
});