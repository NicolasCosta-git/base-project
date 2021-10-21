import Users from '../entity/Users'
import { Service } from 'typedi'
import { Ierror } from 'src/interfaces/error'

@Service()
export default class UsersService {
  createUser = async (data: Partial<Users>): Promise<Users | Ierror> => {
    const user = await Users.findOne({ email: data.email })
    if (user) {
      return { error: true, name: 'API Users Error', message: 'User already exists' }
    }
    return await Users.create({ ...data }).save()
  };

  getUser = async (data): Promise<Users | Ierror> => {
    const user = await Users.createQueryBuilder()
      .select()
      .where('status = :status', { status: true })
      .andWhere('id = :id', { id: data.id })
      .orWhere('email = :email', { email: data.email })
      .andWhere('status = :status', { status: true })
      .getOne()
    if (user) return user
    return { error: true, name: 'API Users Error', message: 'User not found' }
  }

  getUsers = async (): Promise<Users[]> => {
    return await Users.createQueryBuilder()
      .select()
      .where('status = :status', { status: true })
      .getMany()
  }

  updateUser = async (data): Promise<Users | Ierror> => {
    await this.getUser({ id: data.id })
    const userByEmail = await this.getUser({ email: data.email })
    if (((userByEmail.id + '' === data.id) && ((userByEmail.email !== data.email) ||
     (userByEmail.email === data.email))) ||
      ((userByEmail.email !== data.email) ||
       (!userByEmail))) {
      await Users.update({ id: data.id }, { ...data })
      return await Users.findOne({ id: data.id })
    } return { error: true, name: 'API Users Error', message: 'Email already in use' }
  }

  deleteUser = async (data): Promise<boolean | Ierror> => {
    const user = await this.getUser(data)
    if (user.error) {
      return user
    } else {
      await Users.update(data, { status: false })
      return true
    }
  }
}
