// src/routes/auth.ts
import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const { username, email, password, profile } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({ username, email, password: hashedPassword, profile });
  await userRepository.save(user);
  res.status(201).send('User created');
});

router.post('/login', async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const { email, password } = req.body;
  const user = await userRepository.findOneBy({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

router.post('/logout', (req: Request, res: Response) => {
  // Handle logout (e.g., by invalidating the token on the client side)
  res.status(200).send('Logged out');
});

export default router;
