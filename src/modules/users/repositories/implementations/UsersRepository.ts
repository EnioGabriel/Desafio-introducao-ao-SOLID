import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const findUserById = this.users.find((user) => {
      return user.id === id;
    });

    return findUserById;
  }

  findByEmail(email: string): User | undefined {
    const findUserByEmail = this.users.find((user) => {
      return user.email === email;
    });

    return findUserByEmail;
  }

  turnAdmin(receivedUser: User): User {
    // Atualizando dados do usuário para admin
    const user = Object.assign(receivedUser, {
      admin: true,
      updated_at: new Date(),
    });

    // registrando alteração no array de users
    this.users = this.users.map((registeredUser) => {
      console.log(registeredUser);

      if (registeredUser.id === user.id) {
        return user;
      }
      return registeredUser;
    });

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
