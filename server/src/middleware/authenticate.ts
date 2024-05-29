// src/middleware/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

interface JwtPayload {
  id: number;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, 'secret') as JwtPayload;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: decoded.id });
    if (!user) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
