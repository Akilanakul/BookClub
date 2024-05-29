// src/types.d.ts
import { User } from './entity/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
