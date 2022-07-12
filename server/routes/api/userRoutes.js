import express from "express";
const userRouter = express.Router();

// Controllers
import {
  registerUser,
  loginUser,
  getMe,
} from "../../controllers/api/userController.js";

// Middleware
import protect from "../../middleware/authMiddleware.js";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getMe);

export default userRouter;
