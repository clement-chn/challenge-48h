import { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export class UserController {
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body;
      const newUser = await UserService.createUser(user);

      if (!newUser) {
        res.status(400).json({ error: "Erreur lors de la création de l'utilisateur." });
        return;
      }

      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const updatedData = req.body;

      const updatedUser = await UserService.updateUser(userId, updatedData);

      if (!updatedUser) {
        res.status(404).json({ error: "Utilisateur introuvable ou non modifié." });
        return;
      }

      res.json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);

      const message = await UserService.deleteUser(userId);

      res.json({ message });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Une erreur inconnue est survenue.' });
      }
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé." });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Mot de passe incorrect." });
        return;
      }

      const token = randomBytes(32).toString('hex'); 

      res.json({ message: "Connexion réussie.", token, user });
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