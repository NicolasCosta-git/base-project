import { Ierror } from '../interfaces/error'
import Guests from '../entity/Guests'
import { Service } from 'typedi'
import Events from '../entity/Events'

@Service()
export default class GuestsService {
  createGuest = async (data: Partial<Guests>): Promise<Guests> => {
    return await Guests.create({ ...data }).save()
  };

  getGuestsByEvent = async (data): Promise<Guests[] | Ierror> => {
    const event = await Events.createQueryBuilder()
      .where({ id: data.eventId })
      .andWhere({ statusDeleted: false })
      .getOne()
    if (event) {
      const guests = await Guests.createQueryBuilder()
        .select()
        .where('statusRejected = :statusRejected', { statusRejected: false })
        .andWhere('eventId = :eventId', { eventId: data.eventId })
        .getMany()
      if (!guests) return []
      return guests
    } else {
      return { error: true, name: 'API Guests error', message: 'Event does not exist' }
    }
  }

  getGuestInvites = async (data): Promise<Guests[] | Ierror> => {
    const guests = await Guests.createQueryBuilder()
      .select()
      .where('statusRejected = :statusRejected', { statusRejected: false })
      .andWhere('statusDeclined - :statusDeclined', { statusDeclined: false })
      .andWhere('userId = :userId', { userId: data.userId })
      .getMany()
    if (!guests) return []
    return guests
  }

  acceptInvite = async (data): Promise<Events | Ierror> => {
    const guest = await Guests.createQueryBuilder()
      .select()
      .where('statusRejected = :statusRejected', { statusRejected: false })
      .andWhere('id = :id', { id: data.id })
      .getOne()
    if (!guest) return { error: true, name: 'API Guests error', message: 'Guest does not exist' }
    await Guests.update({ id: data.id }, { statusAccepted: true })
    return await Events.findOne({ id: data.id })
  }

  declineInvite = async (data): Promise<Events | Ierror> => {
    const guest = await Guests.createQueryBuilder()
      .select()
      .where('statusRejected = :statusRejected', { statusRejected: false })
      .andWhere('id = :id', { id: data.id })
      .getOne()
    if (!guest) return { error: true, name: 'API Guests error', message: 'Guest does not exist' }
    await Guests.update({ id: data.id }, { statusAccepted: false })
    return await Events.findOne({ id: data.id })
  }

  rejectInvite= async (data): Promise<Events | Ierror> => {
    const guest = await Guests.createQueryBuilder()
      .select()
      .where('statusRejected = :statusRejected', { statusRejected: false })
      .andWhere('id = :id', { id: data.id })
      .getOne()
    if (!guest) return { error: true, name: 'API Guests error', message: 'Guest does not exist' }
    await Guests.update({ id: data.id }, { statusRejected: true })
    return await Events.findOne({ id: data.id })
  }
}
