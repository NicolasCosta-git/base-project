import { Ierror } from 'src/interfaces/error'
import { LoginInputDTO } from '../dto/login.dto'
import { LoginService } from '../services/login.service'
import { Service } from 'typedi'
import { Request, Response } from 'express'
import { validationHandler } from '../helpers/validationHandler.helper'

@Service()
export default class LoginController {
  constructor (private readonly loginService: LoginService) {}

  login = async (req: Request, res: Response): Promise<LoginInputDTO | Ierror> => {
    const input = await validationHandler(req, res, LoginInputDTO)
    if (input) {
      const auth = await this.loginService.login(input)
      return res.json(auth)
    }
  };
}
