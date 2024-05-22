import { Request, NextFunction, Response } from "express";
import { taskSchema } from "../validations/taskSchema";
import { taskRepository } from "../repositories/tasklRepository";
import { taskServices } from "../services/taskServices";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);

      const userID = req.userID;

      const task = {
        title,
        description,
        date,
        status,
        id_user: userID,
      };

      const taskCreated = await taskServices.create(task, taskRepository);

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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);

      const userID = req.userID;
      const { taskID } = req.params;

      const task = {
        title,
        description,
        date,
        status,
        id_user: userID,
      };

      const taskUpdate = await taskServices.update(
        taskID,
        task,
        taskRepository
      );

      return res.status(201).json({ message: "Task update!", taskUpdate });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.userID;
      const { taskID } = req.params;

      const taskDelete = await taskServices.delete(
        taskID,
        userID,
        taskRepository
      );

      return res.status(201).json({ message: "Task delete!", taskDelete});
    } catch (error) {
      return next(error);
    }
  },
};
