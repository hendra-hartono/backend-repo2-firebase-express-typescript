import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequestMiddleware";
import { verifyToken } from "../middleware/authMiddleware";
const {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
} = require("../controller/userController");
const router = express.Router();

router.get("/users", fetchUsers);
router.get("/users/:id", fetchUser);

router.post(
  "/users",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("mobilePhone").notEmpty().withMessage("Mobile Phone is required"),
  ],
  validateRequest,
  createUser
);

router.put(
  "/users/:id",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("mobilePhone").notEmpty().withMessage("Mobile Phone is required"),
  ],
  validateRequest,
  updateUser
);

export { router as userRouter };
