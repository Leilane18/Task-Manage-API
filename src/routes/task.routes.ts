import { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddlewares } from "../middlewares/authMiddlewares";

export const taskRoutes = Router();

taskRoutes.post("/task", authMiddlewares, taskControllers.create);
