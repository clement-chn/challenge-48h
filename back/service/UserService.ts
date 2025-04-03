import { supabase } from '../api/supabaseClient';
import bcrypt from 'bcrypt';
import { User } from '../interface/User';
import crypto from 'crypto';

export class UserService {
  
  static async createUser(user: User) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const { data, error } = await supabase.from('users').insert([
        { name: user.name, surname: user.surname, email: user.email, phone: user.phone, password: hashedPassword, city: user.city },
      ]);

      if (error) {
        throw new Error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
      }

      return data;
    } catch (error) {
      throw new Error(`Erreur interne: ${error.message}`);
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('email', email).single();

      if (error) {
        throw new Error(`Erreur lors de la récupération de l'utilisateur: ${error.message}`);
      }

      return data as User;
    } catch (error) {
      throw new Error(`Erreur interne: ${error.message}`);
    }
  }

  static async generateResetToken(email: string): Promise<string> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error("Utilisateur introuvable");
      }

      const resetToken = crypto.randomBytes(32).toString('hex');

      const { error } = await supabase
        .from('users')
        .update({ reset_token: resetToken })
        .eq('email', email);

      if (error) {
        throw new Error(`Erreur lors de la génération du token: ${error.message}`);
      }

      return resetToken;
    } catch (error) {
      throw new Error(`Erreur interne: ${error.message}`);
    }
  }

  static async resetPassword(resetToken: string, newPassword: string) {
    try {
     
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('reset_token', resetToken)
        .single();

      if (error || !user) {
        throw new Error("Token invalide ou expiré");
      }

   
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      
      const { error: updateError } = await supabase
        .from('users')
        .update({ password: hashedPassword, reset_token: null })
        .eq('id', user.id);

      if (updateError) {
        throw new Error(`Erreur lors de la mise à jour du mot de passe: ${updateError.message}`);
      }

      return "Mot de passe mis à jour avec succès";
    } catch (error) {
      throw new Error(`Erreur interne: ${error.message}`);
    }
  }

  static async sendInvitation(email: string, currentUser: User): Promise<string> {
    try {
      if (!currentUser.isAdmin) {
        throw new Error("Vous n'êtes pas autorisé à envoyer des invitations.");
      }

      const token = crypto.randomBytes(32).toString('hex');

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      const { error } = await supabase.from('invitations').insert([
        { email, token, expires_at: expiresAt },
      ]);

      if (error) {
        throw new Error(`Erreur lors de l'envoi de l'invitation: ${error.message}`);
      }

      const invitationLink = `https://votre-site.com/invitation?token=${token}`;
      console.log(`Invitation envoyée à ${email}: ${invitationLink}`);

      return invitationLink;
    } catch (error) {
      throw new Error(`Erreur interne: ${error.message}`);
    }
  }
}