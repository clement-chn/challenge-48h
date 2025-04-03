import { supabase } from '../api/supabaseClient';
import crypto from 'crypto';
import { User } from '../interface/User';

export class InvitationService {
  static async sendInvitation(email: string, currentUser: User): Promise<string> {
    if (!currentUser.isAdmin) {
      throw new Error("Vous n'êtes pas autorisé à envoyer des invitations.");
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // L'invitation expire dans 24 heures

    const { error } = await supabase.from('invitations').insert([
      { email, token, expires_at: expiresAt },
    ]);

    if (error) {
      throw new Error(`Erreur lors de l'envoi de l'invitation : ${error.message}`);
    }

    return `http://localhost?token=${token}`;
  }
}