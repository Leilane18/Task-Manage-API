import { Request, NextFunction, Response } from "express";
import { taskSchema } from "../validations/taskSchema";
import { taskServices } from "../services/taskServices";
import { taskRepository } from "../repositories/taskRepository";
import { paginationSchema } from "../validations/paginationSchema";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;

      const task = { title, description, date, status, id_user: userID };

      const taskCreated = await taskServices.create(task, taskRepository);

      return res.status(201).json({ message: "task created!", taskCreated });
    } catch (error) {
      return next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset, filter } = paginationSchema.parse(req.query);
      const userID = req.userID;

      const userTasks = await taskServices.read(
        {
          userID,
          limit,
          offset,
          filter,
        },
        taskRepository
      );

      return res.status(200).json({ message: "tasks read!", ...userTasks });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;
      const { taskID } = req.params;

      const task = { title, description, date, status, id_user: userID };

      const taskUpdated = await taskServices.update(taskID, task, taskRepository);

      return res.status(201).json({ message: "task updated!", taskUpdated });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.userID;
      const { taskID } = req.params;

      const taskDelete = await taskServices.delete(taskID, userID, taskRepository);

      return res.status(201).json({ message: "task deleted!", taskDelete });
    } catch (error) {
      return next(error);
    }
  },
};
