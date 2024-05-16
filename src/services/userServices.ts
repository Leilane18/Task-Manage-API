import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";

type UserDataCreate = {
  name: string;
  email: string;
  password: string;
};

type Repository = {
    createUser(data: UserDataCreate) : Promise<{id: string}| undefined>;
};

export const userServices = {
  async create(data: UserDataCreate, repository: Repository) {
    try {
      const { name, email, password } = data;

      const passwordHash = await hash(password, 10);

      const user = {
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
      };

      const userCreated = await repository.createUser(user);

      return userCreated

    } catch (error) {
      throw error;
    }
  },
};
