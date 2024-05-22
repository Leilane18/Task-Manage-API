import { randomUUID } from "node:crypto";
import { TaskDataTypes } from "../validations/taskSchema";
import { appError } from "../errors/appError";

export type CreateTaskDataTypes = TaskDataTypes & { id_user: string };

type Repository = {
  createTask(data: CreateTaskDataTypes): Promise<{ id: string } | undefined>;
  updateTask(data: CreateTaskDataTypes): Promise<{ id: string } | undefined>;
  getTask(id: string): Promise<{ id_user: string } | undefined>;
  deleteTask(id: string): Promise<{} | undefined>;
};

export const taskServices = {
  async create(data: CreateTaskDataTypes, repository: Repository) {
    try {
      const { title, description, date, status, id_user } = data;

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        status,
        id_user,
      };

      const taskCreated = await repository.createTask(task);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async update(id: string, data: CreateTaskDataTypes, repository: Repository) {
    try {
      const { title, description, date, status, id_user } = data;

      const task = {
        id,
        title,
        description,
        date,
        status,
        id_user,
      };

      const userTask = await repository.getTask(id);
      if (!userTask) throw appError("task not found!", 404);

      if (userTask.id_user != id_user) {
        throw appError("user not authorized to update!", 401);
      }

      const taskUpdate = await repository.updateTask(task);

      return taskUpdate;
    } catch (error) {
      throw error;
    }
  },

  async delete(taskID: string, userID: string, repository: Repository) {
    try {
      const userTask = await repository.getTask(taskID);
      if (!userTask) throw appError("task not found!", 404);

      if (userTask.id_user != userID) {
        throw appError("user not authorized to delete!", 401);
      }

      const taskDelete = await repository.deleteTask(taskID);

      if (!taskDelete) throw appError("task not deleted!", 500);

      return taskDelete;
    } catch (error) {
      throw error;
    }
  },
};
