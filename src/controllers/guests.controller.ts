import { GuestsInputDTO } from "../dto/guests-input.dto";
import GuestsService from "../services/guests.service";
import { Service } from "typedi";
import { Request, Response } from "express";
import { validateInput } from "../helpers/validation.helper";
import Guests from "src/entity/Guests";

@Service()
export default class guestsController {
  constructor(private readonly guestsService: GuestsService) {}

  createGuest = async (req: Request, res: Response): Promise<Guests> => {
    const guestInput = validateInput(GuestsInputDTO, req.body);
    if (guestInput.errors.length > 0) return res.json(guestInput.errors);
    return res.json(await this.guestsService.createGuest(guestInput.data));
  };
}
