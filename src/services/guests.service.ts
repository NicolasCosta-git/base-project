import Guests from "../entity/Guests";
import { Service } from "typedi";

@Service()
export default class GuestsService {
  createGuest = async (data: Partial<Guests>): Promise<Guests> => {
    return await Guests.create({ ...data }).save();
  };
}
