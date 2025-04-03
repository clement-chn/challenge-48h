import { User } from '../interface/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}