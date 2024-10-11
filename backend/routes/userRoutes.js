import express from "express"
import {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
  } from "../controllers/userController.js";
  import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/user/register",registerUser);
userRouter.post("/user/login",loginUser);
userRouter.post("/user/logout",logoutUser);
userRouter.post("/user/islogged",authMiddleware ,isUserLoggedIn);

export default userRouter
