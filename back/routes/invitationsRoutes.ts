import express from 'express';
import { UserService } from '../service/UserService';

const router = express.Router();

router.post('/send-invitation', async (req, res) => {
  try {
    const { email } = req.body;
    const currentUser = req.user;

    
    const invitationLink = await UserService.sendInvitation(email, currentUser);
    res.json({ message: 'Invitation envoyée', link: invitationLink });
  } catch (error) {
    res.status(403).json({ error: error.message }); // 403 : Accès refusé
  }
});

export default router;