const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config({
  path: "./.env",
});

const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`App is listening on port: ${process.env.PORT}`);
});
