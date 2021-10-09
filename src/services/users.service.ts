import Users from "../entity/Users";
import { Service } from "typedi";

@Service()
export default class UsersService {
  createUser = async (data: Partial<Users>): Promise<Users> => {
    return await Users.create({ ...data }).save();
  };
}
