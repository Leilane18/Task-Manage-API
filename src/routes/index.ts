import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";
import { taskRoutes } from "./task.routes";

export const router = Router();

router.use(userRoutes);
router.use(authRoutes);
router.use(taskRoutes);
