import express from 'express';
import { GlobalService } from '../service/GlobalService';

const router = express.Router();

// Route pour récupérer tous les thèmes
router.get('/themes', async (req, res) => {
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
});

// Route pour récupérer tous les publics
router.get('/publics', async (req, res) => {
  try {
    const publics = await GlobalService.getAllFromTable('public');
    res.json(publics);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
});

// Route pour récupérer tous les types
router.get('/types', async (req, res) => {
  try {
    const types = await GlobalService.getAllFromTable('eventtype');
    res.json(types);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
});

// Route pour récupérer tous les niveaux scolaires
router.get('/schoolLevels', async (req, res) => {
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
  });

export default router;