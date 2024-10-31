import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequestMiddleware";
const { register, login, logout } = require("../controller/authController");
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").trim().notEmpty().withMessage("Invalid password"),
  ],
  validateRequest,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").trim().notEmpty().withMessage("Invalid password"),
  ],
  validateRequest,
  login
);

router.post("/logout", logout);

export { router as authRouter };
