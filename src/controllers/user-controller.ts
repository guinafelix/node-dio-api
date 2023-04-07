import { Request, Response, response } from "express"
import { UserService } from "../services/user-service"

export class UserController {
  userService: UserService

  constructor(
    userService = new UserService()
  ) {
    this.userService = userService
  }

  createUser = (request: Request, response: Response) => {
    const user = request.body

    if (!user.name || !user.email) {
      return response.status(400).json({ message: 'Dados inválidos' });
    }

    this.userService.createUser(user.name, user.email)
    return response.status(201).json({ message: 'Usuário criado' });
  }

  getAllUsers = (response: Response) => {
    const users = this.userService.getUsers()

    return response.status(200).json(users)
  }

  deleteUser = (request: Request, response: Response) => { 
    const params = request.params
    const user = this.userService.deleteUser(params?.name)
    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' })
    }
    return response.status(200).json({ message: 'Usuário deletado' })
  }
}