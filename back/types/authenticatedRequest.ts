import { Request } from 'express';
import { User } from '../interface/User';

export interface AuthenticatedRequest extends Request {
  user?: User;
}