import { Request, Response } from 'express';
import { InvitationService } from '../service/InvitationService';
import { User } from '../interface/User';

export class InvitationController {
  static async sendInvitation(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const currentUser = res.locals.user as User;

      if (!currentUser) {
        res.status(401).json({ error: "Utilisateur non authentifié." });
        return;
      }

      const invitationLink = await InvitationService.sendInvitation(email, currentUser);
      res.json({ message: 'Invitation envoyée', link: invitationLink });
    } catch (error) {
      if (error instanceof Error) {
        res.status(403).json({ error: error.message });
      } else {
        res.status(403).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }
}