import express, { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/send-invitation', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const currentUser = req.user;

    if (!currentUser) {
      res.status(401).json({ error: "Utilisateur non authentifié." });
      return;
    }

    const invitationLink = await UserService.sendInvitation(email, currentUser);
    res.json({ message: 'Invitation envoyée', link: invitationLink });
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).json({ error: error.message }); // 403 : Accès refusé
    } else {
      res.status(403).json({ error: 'Une erreur inconnue est survenue.' });
    }
  }
});

export default router;