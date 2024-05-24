export type UserDataCreate = {
  id: string;
  name: string;
  email: string;
  password: string;
};

let userArray = [
  { id: "1", name: "user1", email: "user12@gmail.com", password: "1818" },
];

export const userRepositoryInMemory = {
  async createUser({ id, name, email, password }: UserDataCreate) {
    try {
      const user = { id, name, email, password };
      userArray.push(user);

      return userArray[userArray.length - 1];
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const user = userArray.find((user) => user.email == email);
      return user;
    } catch (error) {
      throw error;
    }
  },
};
