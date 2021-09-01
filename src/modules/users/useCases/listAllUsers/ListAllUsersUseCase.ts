import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const isUserAdmin = this.usersRepository.findById(user_id);

    if (!isUserAdmin) {
      throw new Error("ID não encontrado");
    }

    if (!isUserAdmin.admin) {
      throw new Error("Você nã tem permissão para realizar essa ação");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
