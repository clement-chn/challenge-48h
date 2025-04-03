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
      return null; 
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
      return null; 
    }
  }

  static async generateResetToken(email: string): Promise<string | null> {
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
      if (error instanceof Error) {
        console.error(`Erreur interne : ${error.message}`);
      } else {
        console.error('Erreur inconnue.');
      }
      return null; 
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
      return null; 
    }
  }

  static async updateUser(userId: number, updatedData: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updatedData) 
        .eq('id', userId)
        .select('*') 
        .single();

      if (error) {
        throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
      }

      return data as User;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erreur interne : ${error.message}`);
      } else {
        console.error('Erreur inconnue.');
      }
      return null;
    }
  }

  static async deleteUser(userId: number): Promise<string> {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) {
        throw new Error(`Erreur lors de la suppression de l'utilisateur : ${error.message}`);
      }

      return "Utilisateur supprimé avec succès";
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erreur interne : ${error.message}`);
      } else {
        console.error('Erreur inconnue.');
      }
      throw new Error("Erreur lors de la suppression de l'utilisateur");
    }
  }
}