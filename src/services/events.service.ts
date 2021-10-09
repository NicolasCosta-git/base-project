import Events from "../entity/Events";
import { Service } from "typedi";

@Service()
export default class EventsService {
  createEvent = async (data: Partial<Events>): Promise<Events> => {
    return await Events.create({ ...data }).save();
  };
}
