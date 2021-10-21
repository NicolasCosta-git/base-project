import { EventsGetDTO, EventsUpdateDTO } from './../dto/events.dto'
import { EventsInputDTO } from '../dto/events.dto'
import EventsService from '../services/events.service'
import { Service } from 'typedi'
import { Request, Response } from 'express'
import Users from 'src/entity/Users'
import { validationHandler } from '../helpers/validationHandler.helper'

@Service()
export default class UsersController {
  constructor (private readonly eventsService: EventsService) {}

  createEvent = async (req: Request, res: Response): Promise<Users> => {
    const input = await validationHandler(req, res, EventsInputDTO)
    if (input) return res.json(await this.eventsService.createEvent(input))
  };

  getEvent = async (req: Request, res: Response): Promise<Users> => {
    const input = await validationHandler(req, res, EventsGetDTO, { ...req.body, ...req.params })
    if (input) return res.json(await this.eventsService.getEvent({ ...input, ...req.params }))
  };

  getEvents = async (req: Request, res: Response): Promise<Users> => {
    const input = await validationHandler(req, res, EventsGetDTO, { ...req.body, ...req.params })
    if (input) return res.json(await this.eventsService.getEvents({ ...input, ...req.params }))
  };

  updateEvent = async (req: Request, res: Response): Promise<Users> => {
    const input = await validationHandler(req, res, EventsUpdateDTO, { ...req.body, ...req.params })
    if (input) return res.json(await this.eventsService.updateEvent({ ...input, ...req.params }))
  };

  deleteEvent = async (req: Request, res: Response): Promise<Users> => {
    const input = await validationHandler(req, res, EventsGetDTO, { ...req.body, ...req.params })
    if (input) return res.json(await this.eventsService.deleteEvent({ ...input, ...req.params }))
  };
}
