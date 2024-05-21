import { Request, NextFunction, Response } from "express";
import { taskSchema } from "../validations/taskSchema";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);

      const userID = req.userID;

      const taskCreated = {
        title,
        description,
        date,
        status,
        id_user: userID,
      };

      //  const taskCreated = await taskServices.create(
      //  {  title, description, date, status, },
      //userRepository
      //);

      return res.status(201).json({ message: "Task create!", taskCreated });
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
