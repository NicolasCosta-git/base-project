import express from "express";
import UsersController from "../controllers/users.controller";
import EventsController from "../controllers/events.controller";
import GuestsController from "../controllers/guests.controller";
import { Container } from "typedi";

const router = express.Router();

const usersController = Container.get(UsersController);
const eventsController = Container.get(EventsController);
const guestsController = Container.get(GuestsController);

//user routes
router.post("/user", usersController.createUser);

//event routes
router.post("/event", eventsController.createEvent);

//guest routes
router.post("/guest", guestsController.createGuest);

export default router;
