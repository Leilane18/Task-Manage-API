import { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddlewares } from "../middlewares/authMiddlewares";

export const taskRoutes = Router();
taskRoutes.use(authMiddlewares);

taskRoutes.post("/task", authMiddlewares, taskControllers.create);
taskRoutes.get("/task", authMiddlewares, taskControllers.read);
taskRoutes.put("/task/:taskID", authMiddlewares, taskControllers.update);
taskRoutes.delete("/task/:taskID", authMiddlewares, taskControllers.delete);
