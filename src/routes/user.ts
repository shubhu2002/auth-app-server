import express from "express";
import { createUser, getAllUsers, authenticateUser,checkusername } from "../controllers/user";

const router = express.Router();

router.post("/register", createUser);
router.get("/all", getAllUsers);
router.post("/login", authenticateUser);
router.post("/checkusername", checkusername);

export default router;
