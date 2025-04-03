import { Request, Response } from 'express';
import { EventService } from '../service/EventService';
import { User } from '../interface/User';

export class EventController {
  static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = req.body;
      const currentUser = res.locals.user as User; 

      const newEvent = await EventService.createEvent(event, currentUser);
      res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventId = parseInt(req.params.id, 10);
      const updatedEvent = req.body;
      const currentUser = res.locals.user as User; 

      const event = await EventService.updateEvent(eventId, updatedEvent, currentUser);
      res.json(event);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventId = parseInt(req.params.id, 10);
      const currentUser = res.locals.user as User; 

      await EventService.deleteEvent(eventId, currentUser);
      res.json({ message: 'Événement supprimé avec succès.' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async getEventsByDate(req: Request, res: Response): Promise<void> {
    try {
      const events = await EventService.getEventsByDate();
      res.json(events);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async getEventsByCity(req: Request, res: Response): Promise<void> {
    try {
      const { city } = req.params;
      const events = await EventService.getEventsByCity(city);
      res.json(events);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async getEventsByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId, 10);
      const events = await EventService.getEventsByUser(userId);
      res.json(events);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async someProtectedRoute(req: Request, res: Response): Promise<void> {
    try {
      const currentUser = res.locals.user;

      if (!currentUser) {
        res.status(401).json({ error: 'Utilisateur non authentifié.' });
        return;
      }

      res.json({ message: 'Route protégée accessible.', user: currentUser });
    } catch (error) {
      res.status(500).json({ error: 'Erreur interne.' });
    }
  }
}