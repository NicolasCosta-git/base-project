import { UsersInputDTO } from "../dto/users-input.dto";
import UsersService from "../services/users.service";
import { Service } from "typedi";
import { Request, Response } from "express";
import { validateInput } from "../helpers/validation.helper";
import Users from "src/entity/Users";

@Service()
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  createUser = async (req: Request, res: Response): Promise<Users> => {
    const userInput = validateInput(UsersInputDTO, req.body);
    if (userInput.errors.length > 0) return res.json(userInput.errors);
    return res.json(await this.usersService.createUser(userInput.data));
  };
}
