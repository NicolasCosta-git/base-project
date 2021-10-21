import { Ierror } from './../interfaces/error'
import { UsersDeleteDTO, UsersGetDTO, UsersInputDTO, UsersUpdateDTO } from '../dto/users.dto'
import UsersService from '../services/users.service'
import { Service } from 'typedi'
import { Request, Response } from 'express'
import Users from 'src/entity/Users'
import { validationHandler } from '../helpers/validationHandler.helper'

@Service()
export default class UsersController {
  constructor (private readonly usersService: UsersService) {}

  createUser = async (req: Request, res: Response): Promise<Users> => {
    const input = await validationHandler(req, res, UsersInputDTO)
    if (input) return res.json(await this.usersService.createUser(input))
  };

  getUser = async (req: Request, res: Response): Promise<Users | Ierror> => {
    const input = await validationHandler(req, res, UsersGetDTO, req.params)
    if (input) return res.json(await this.usersService.getUser(input))
  };

  getUsers = async (req: Request, res: Response): Promise<Users[]> => {
    return res.json(await this.usersService.getUsers())
  }

  updateUser = async (req: Request, res: Response): Promise<Users> => {
    const input = await validationHandler(req, res, UsersUpdateDTO, { ...req.params, ...req.body })
    if (input) {
      return await res.json(await this.usersService.updateUser({ id: req.params.id, ...input }))
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<boolean> => {
    const input = await validationHandler(req, res, UsersDeleteDTO, req.params)
    if (input) return res.json(await this.usersService.deleteUser(input))
  }
}
