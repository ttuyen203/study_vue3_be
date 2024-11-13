import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

const userController = new UserController();

router.get("/users", userController.getAllUser);
router.get("/users/:id", userController.getDetailUser);
router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.loginUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
