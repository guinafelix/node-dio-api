import { UserService } from "../services/user-service"
import { UserController } from "./user-controller"
import { makeMockResponse } from "../__mocks__/mock-response.mock"
import { Request } from "express"


describe('UserController', () => { 
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getUsers: jest.fn(),
    deleteUser: jest.fn()
  }
  const userController = new UserController(mockUserService as UserService)

  it('Deve adicionar novo usuário', () => {
    const mockRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@mail.com'
      }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
  })

  it('Deve retornar erro ao criar usuário sem nome', () => {
    const mockRequest = {
      body: {
        email: 'jonhdoe@mail.com'
      } 
    } as Request

    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Dados inválidos' })
  })

  it('Deve retornar erro ao criar usuário sem email', () => {
    const mockRequest = {
      body: {
        name: 'john doe'
      } 
    } as Request

    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Dados inválidos' })
  })

  it('Deve verificar se a função getUsers foi chamada', () => {
    const mockResponse = makeMockResponse()
    userController.getAllUsers(mockResponse)
    expect(mockUserService.getUsers).toHaveBeenCalled()
  })

  it('Deve retornar todos os usuários', () => {
    const mockResponse = makeMockResponse()
    jest.spyOn(mockUserService, 'getUsers').mockReturnValueOnce([{
        name: 'John Doe',
        email: 'johndoe@mail.com'
    }])
    userController.getAllUsers(mockResponse)
    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toMatchObject([{
        name: 'John Doe',
        email: 'johndoe@mail.com'
    }])
  })

  it('Deve retornar erro caso não encontre usuário com o nome informado ao deletar', () => { 
    const mockRequest = {
      params: {
        name: 'name'
      }
    } as unknown as Request
    const mockResponse = makeMockResponse()
    jest.spyOn(mockUserService, 'deleteUser').mockReturnValueOnce(null)
    userController.deleteUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(404)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário não encontrado' })
  })

  it('Deve deletar usuário', () => { 
    const mockRequest = {
      body: {
        name: 'John Doe'
      }
    } as Request
    const mockResponse = makeMockResponse()
    jest.spyOn(mockUserService, 'deleteUser').mockReturnValueOnce({
      name: 'John Doe',
      email: 'johndoe@gmail.com'
    })
    userController.deleteUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
  })
})