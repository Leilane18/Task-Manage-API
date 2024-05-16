import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";

type UserData = {
  name: string;
  email: string;
  password: string;
};

type Repository = {
    createUser(data: UserData) : Promise<UserData | undefined>;
};

export const userServices = {
  async create(data: UserData, repository: Repository) {
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

    } catch (error) {
      throw error;
    }
  },
};
