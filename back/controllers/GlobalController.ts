import { Request, Response } from 'express';
import { GlobalService } from '../service/GlobalService';

export class GlobalController {
  static async getThemes(req: Request, res: Response): Promise<void> {
    try {
      const themes = await GlobalService.getAllFromTable('theme');
      res.json(themes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async getPublics(req: Request, res: Response): Promise<void> {
    try {
      const publics = await GlobalService.getAllFromTable('targetpublic');
      res.json(publics);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async getTypes(req: Request, res: Response): Promise<void> {
    try {
      const eventtype = await GlobalService.getAllFromTable('eventtype');
      res.json(eventtype);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async getSchoolLevels(req: Request, res: Response): Promise<void> {
    try {
      const schoolLevels = await GlobalService.getAllFromTable('schoollevel');
      res.json(schoolLevels);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }
}