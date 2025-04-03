import express from 'express';
import { GlobalController } from '../controllers/GlobalController';
import { authenticate } from '../middleware/auth';
import { UserController } from '../controllers/UserController';
import { EventController } from '../controllers/EventController';
import { InvitationController } from '../controllers/InvitationController';

const router = express.Router();

// Routes globales
router.get('/themes', GlobalController.getThemes);
router.get('/publics', GlobalController.getPublics);
router.get('/eventtype', GlobalController.getTypes);
router.get('/schoolLevels', GlobalController.getSchoolLevels);

// Routes pour les événements
router.post('/events', EventController.createEvent);
router.put('/events/:id', EventController.updateEvent);
router.delete('/events/:id', EventController.deleteEvent);
router.get('/events/by-date', EventController.getEventsByDate);
router.get('/events/by-city/:city', EventController.getEventsByCity);
router.get('/events/by-user/:userId', EventController.getEventsByUser);

// Route pour envoyer une invitation
router.post('/send-invitation', authenticate, InvitationController.sendInvitation);

// Routes pour les utilisateurs
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;