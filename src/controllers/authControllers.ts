import { Request, NextFunction, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { loginSchema } from "../validations/loginSchema";
import { authServices } from "../services/authServices";

export const authControllers = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const token = await authServices.login(
        { email, password },
        userRepository
      );

      return res.status(201).json({ message: "Login successful!", token });
    } catch (error) {
      return next(error);
    }
  },
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: "User read!" });
    } catch (error) {
      return next(error);
    }
  },
};
