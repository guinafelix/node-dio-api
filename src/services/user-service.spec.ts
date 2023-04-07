import { User, UserService } from "./user-service";

describe('UserService', () => { 
  const mockDb: User[] = []
  const userService = new UserService(mockDb);

  it('Deve Adicionar um novo usuário', () => {
    const mockConsole = jest.spyOn(global.console, 'log')
    userService.createUser('John Doe', 'johndoe@mail.com')
    expect(mockConsole).toHaveBeenCalledWith('Usuário criado com sucesso!')
  })
})