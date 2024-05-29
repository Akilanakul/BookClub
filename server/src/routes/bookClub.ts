// src/routes/bookClub.ts
import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { BookClub } from '../entity/BookClub';
import { User } from '../entity/User';
import { authenticateToken } from '../middleware/authenticate';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const bookClubRepository = AppDataSource.getRepository(BookClub);
  const bookClubs = await bookClubRepository.find({ relations: ['members'] });
  res.json(bookClubs);
});

router.get('/:id', async (req: Request, res: Response) => {
  const bookClubRepository = AppDataSource.getRepository(BookClub);
  const bookClub = await bookClubRepository.findOne({
    where: { id: parseInt(req.params.id, 10) },
    relations: ['members'],
  });
  if (bookClub) {
    res.json(bookClub);
  } else {
    res.status(404).send('Book club not found');
  }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const bookClubRepository = AppDataSource.getRepository(BookClub);
  const { name, description } = req.body;
  const bookClub = bookClubRepository.create({ name, description });
  await bookClubRepository.save(bookClub);
  res.status(201).json(bookClub);
});

router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  const bookClubRepository = AppDataSource.getRepository(BookClub);
  const bookClub = await bookClubRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (bookClub) {
    bookClubRepository.merge(bookClub, req.body);
    await bookClubRepository.save(bookClub);
    res.json(bookClub);
  } else {
    res.status(404).send('Book club not found');
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  const bookClubRepository = AppDataSource.getRepository(BookClub);
  const bookClub = await bookClubRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (bookClub) {
    await bookClubRepository.remove(bookClub);
    res.status(204).send();
  } else {
    res.status(404).send('Book club not found');
  }
});

router.post('/:id/join', authenticateToken, async (req: Request, res: Response) => {
  const bookClubRepository = AppDataSource.getRepository(BookClub);
  const userRepository = AppDataSource.getRepository(User);
  const bookClub = await bookClubRepository.findOne({
    where: { id: parseInt(req.params.id, 10) },
    relations: ['members'],
  });
  if (bookClub) {
    const user = await userRepository.findOneBy({ id: req.user!.id });
    if (user) {
      bookClub.members.push(user);
      await bookClubRepository.save(bookClub);
      res.status(200).send('Joined book club');
    } else {
      res.status(404).send('User not found');
    }
  } else {
    res.status(404).send('Book club not found');
  }
});

router.post('/:id/leave', authenticateToken, async (req: Request, res: Response) => {
  const bookClubRepository = AppDataSource.getRepository(BookClub);
  const userRepository = AppDataSource.getRepository(User);
  const bookClub = await bookClubRepository.findOne({
    where: { id: parseInt(req.params.id, 10) },
    relations: ['members'],
  });
  if (bookClub) {
    const user = await userRepository.findOneBy({ id: req.user!.id });
    if (user) {
      bookClub.members = bookClub.members.filter(member => member.id !== user.id);
      await bookClubRepository.save(bookClub);
      res.status(200).send('Left book club');
    } else {
      res.status(404).send('User not found');
    }
  } else {
    res.status(404).send('Book club not found');
  }
});

export default router;
