import express from 'express'
import UsersController from '../controllers/users.controller'
import EventsController from '../controllers/events.controller'
import GuestsController from '../controllers/guests.controller'
import { Container } from 'typedi'
import { authMiddleware } from '../middleware/authentication.middleware'
import LoginController from '../controllers/login.controller'

const router = express.Router()

const usersController = Container.get(UsersController)
const eventsController = Container.get(EventsController)
const guestsController = Container.get(GuestsController)
const loginController = Container.get(LoginController)

// user routes
router.post('/user', usersController.createUser)
router.get('/user/:id', authMiddleware, usersController.getUser)
router.get('/user', authMiddleware, usersController.getUsers)
router.delete('/user/:id', authMiddleware, usersController.deleteUser)
router.put('/user/:id', authMiddleware, usersController.updateUser)

// event routes
router.post('/event', authMiddleware, eventsController.createEvent)
router.get('/event/:id', authMiddleware, eventsController.getEvent)
router.get('/event', authMiddleware, eventsController.getEvents)
router.delete('/event/:id', authMiddleware, eventsController.deleteEvent)
router.put('/event/:id', authMiddleware, eventsController.updateEvent)

// guest routes
router.post('/guest', authMiddleware, guestsController.createGuest)
router.get('/guest/event/:id', authMiddleware, guestsController.getGuestsByEvent)
router.get('/guest/invites/', authMiddleware, guestsController.getGuestInvites)
router.put('/guest/invites/:id', authMiddleware, guestsController.acceptInvite)
router.delete('/guest/invites/:id', authMiddleware, guestsController.declineInvite)
router.post('/guest/reject/id', authMiddleware, guestsController.rejectInvite)

// login route
router.post('/login', loginController.login)

export default router
