import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../interface/User';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Accès non autorisé.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'votre_secret') as User;
    res.locals.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide.' });
  }
};