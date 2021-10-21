import { Ierror } from 'src/interfaces/error'
import { GuestsGetByEventDTO, GuestsInputDTO, GuestsRejectDTO, GuestsUserDTO } from '../dto/guests.dto'
import GuestsService from '../services/guests.service'
import { Service } from 'typedi'
import { Request, Response } from 'express'
import { validateInput } from '../helpers/validation.helper'
import Guests from 'src/entity/Guests'
import { validationHandler } from '../helpers/validationHandler.helper'

@Service()
export default class guestsController {
  constructor (private readonly guestsService: GuestsService) {}

  createGuest = async (req: Request, res: Response): Promise<Guests> => {
    const guestInput = validateInput(GuestsInputDTO, req.body)
    if (guestInput.errors.length > 0) return res.json(guestInput.errors)
    return res.json(await this.guestsService.createGuest(guestInput.data))
  };

  getGuestsByEvent = async (req: Request, res: Response): Promise<Guests | Ierror> => {
    const input = await validationHandler(req, res, GuestsGetByEventDTO)
    if (input) return res.json(await this.guestsService.getGuestsByEvent(input))
  };

  getGuestInvites = async (req: Request, res: Response): Promise<Guests> => {
    const input = await validationHandler(req, res, GuestsUserDTO)
    if (input) return res.json(await this.guestsService.getGuestInvites(input))
  };

  acceptInvite = async (req: Request, res: Response): Promise<Guests | Ierror> => {
    const input = await validationHandler(req, res, GuestsUserDTO, { ...req.body, ...req.params })
    if (input) return res.json(await this.guestsService.acceptInvite({ ...input, ...req.params }))
  };

  declineInvite = async (req: Request, res: Response): Promise<Guests | Ierror> => {
    const input = await validationHandler(req, res, GuestsUserDTO, { ...req.body, ...req.params })
    if (input) return res.json(await this.guestsService.declineInvite({ ...input, ...req.params }))
  };

  rejectInvite = async (req: Request, res: Response): Promise<Guests | Ierror> => {
    const input = await validationHandler(req, res, GuestsRejectDTO, { ...req.body, ...req.params })
    if (input) return res.json(await this.guestsService.declineInvite({ ...input, ...req.params }))
  };
}
