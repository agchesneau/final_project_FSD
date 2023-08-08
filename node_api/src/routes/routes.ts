import express from "express";
import RegisterController from "../controllers/registerController";
import LoginController from "../controllers/loginController";
import {
  getByIDController,
  getByTypeController,
  getByNameController,
  addMediaController,
} from "../controllers/mediaControllers";
import {
  addEntryController,
  updateEntryController,
  deleteEntryController,
  getStartedController,
  getCompletedController,
} from "../controllers/diaryController";
import {
  addListEntryController,
  updateListEntryController,
  getListEntryController,
} from "../controllers/listController";
import authentication from "../middleware/authentication";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Authentication routes
router.post("/register", authentication, RegisterController);
router.post("/login", authentication, LoginController);

// Media routes
router.get("/media/id/:id", verifyToken, getByIDController);
router.get("/media/type/:type", verifyToken, getByTypeController);
router.get("/media/name/:name", verifyToken, getByNameController);
router.post("/media/add", verifyToken, addMediaController);

// Diary routes
router.post("/diary/add", verifyToken, addEntryController);
router.put("/diary/update/:id", verifyToken, updateEntryController);
router.delete("/diary/delete/:id", verifyToken, deleteEntryController);
router.get("/diary/started", verifyToken, getStartedController);
router.get("/diary/completed", verifyToken, getCompletedController);

// Lists routes
router.get("/list/all", verifyToken, getListEntryController);
router.post("/list/add", verifyToken, addListEntryController);
router.put("/list/update/:id", verifyToken, updateListEntryController);

export default router;
