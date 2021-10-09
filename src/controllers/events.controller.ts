import { EventsInputDTO } from "../dto/events-input.dto";
import EventsService from "../services/events.service";
import { Service } from "typedi";
import { Request, Response } from "express";
import { validateInput } from "../helpers/validation.helper";
import Users from "src/entity/Users";

@Service()
export default class UsersController {
  constructor(private readonly eventsService: EventsService) {}

  createEvent = async (req: Request, res: Response): Promise<Users> => {
    const eventInput = validateInput(EventsInputDTO, req.body);
    if (eventInput.errors.length > 0) return res.json(eventInput.errors);
    return res.json(await this.eventsService.createEvent(eventInput.data));
  };
}
