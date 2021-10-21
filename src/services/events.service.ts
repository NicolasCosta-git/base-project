import { Ierror } from '../interfaces/error'
import Events from '../entity/Events'
import { Service } from 'typedi'
import Users from '../entity/Users'

@Service()
export default class EventsService {
  createEvent = async (data: Partial<Events>): Promise<Events | Ierror> => {
    const user = await Users.createQueryBuilder().where({ id: data.createdBy }).getOne()
    if (user) return await Events.create({ ...data }).save()
    return { error: true, name: 'Event creation', message: 'Event\'s host user does not exist' }
  };

  getEvent = async (data): Promise<Events | Ierror> => {
    const user = await Users.createQueryBuilder().where({ id: data.userId }).getOne()
    if (user) {
      const event = await Events.createQueryBuilder()
        .select()
        .where('statusDeleted = :statusDeleted', { statusDeleted: false })
        .andWhere('id = :id', { id: data.id })
        .andWhere('createdBy = :userId', { userId: data.userId })
        .getOne()
      if (!event) return { error: true, name: 'API Events Error', message: 'Event does not exist' }
      return event
    } else {
      return { error: true, name: 'API Events Error', message: 'Event\'s host user does not exist' }
    }
  }

  getEvents = async (data): Promise<Events[] | Ierror> => {
    const user = await Users.createQueryBuilder().where({ id: data.userId }).getOne()
    if (user) {
      const events = await Events.createQueryBuilder()
        .select()
        .where('statusDeleted = :statusDeleted', { statusDeleted: false })
        .andWhere('createdBy = :userId', { userId: data.userId })
        .getMany()
      if (!events) return []
      return events
    } else {
      return { error: true, name: 'API Events Error', message: 'Event\'s host user does not exist' }
    }
  }

  updateEvent = async (data): Promise<Events | Ierror> => {
    const event = await this.getEvent({ id: data.id, userId: data.userId })
    if (event.error) return { error: true, name: 'API Events Error', message: 'Event does not exist' }
    await Events.update({ id: data.id }, data)
    return await Events.findOne({ id: data.id })
  }

  deleteEvent = async (data): Promise<boolean | Ierror> => {
    const event = await this.getEvent({ id: data.id, userId: data.userId })
    if (event.error) return { error: true, name: 'API Events Error', message: 'Event does not exist' }
    await Events.update({ id: data.id }, { statusDeleted: true })
    return true
  }
}
