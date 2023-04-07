const db = [
  {
    name: 'John Doe',
    email: 'johndoe@mail.com' 
  }
]

export interface User {
  name: string
  email: string
}

export class UserService {
  db: User[] = []

  constructor(database = db) {
    this.db = database
  }

  createUser = (name: string, email: string) => { 
    const user = {
      name,
      email
    }
    this.db.push(user)
    console.log('Usuário criado com sucesso!')
  }

  getUsers = () => { 
    return this.db
  }

  deleteUser = (name: string) => { 
    const formatedName = name.replace(/-/g, ' ') 
    const user = this.db.find(user => user.name === formatedName)
    if (!user) { 
      return null
    }
    const index = this.db.indexOf(user)
    this.db.splice(index, 1)
    return user
  }
}