import express from "express";
// import User from "../models/user.model.js";
import {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  createUser,
  authenticateUser
} from "../controllers/user.js";

const router = express.Router();

router.use(express.urlencoded({ extended: false }));

// make apis here

// first api :- GET all users list
router.route("/").get(getAllUser).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);


router.post("/auth",authenticateUser);

export { router };
