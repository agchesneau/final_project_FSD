import express from "express";
import RegisterController from "../controllers/registerController";

const router = express.Router();

router.get("/register", RegisterController);

export default router;
