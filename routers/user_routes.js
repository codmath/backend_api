import express from "express";
import getAllUser from "../controllers/user-control";
import  signup from "../controllers/user-control";
import { login } from "../controllers/user-control";
const router=express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
export default router;

