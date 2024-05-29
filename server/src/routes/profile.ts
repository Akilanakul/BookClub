// src/routes/profile.ts
import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { authenticateToken } from '../middleware/authenticate';

const router = express.Router();

router.get('/profile', authenticateToken, async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: req.user!.id });
  res.json(user);
});

router.put('/profile', authenticateToken, async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const { username, email, profile } = req.body;
  await userRepository.update(req.user!.id, { username, email, profile });
  res.status(200).send('Profile updated');
});

export default router;
