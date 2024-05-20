import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";

export const router = Router();

router.use(userRoutes);
router.use(authRoutes);
