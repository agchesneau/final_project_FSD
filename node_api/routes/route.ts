import express from "express";
import RegisterController from "../controllers/registerController";

const router = express.Router();

router.post("/register", RegisterController);

export default router;
