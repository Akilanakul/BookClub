// src/routes/discussion.ts
import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Discussion } from '../entity/Discussion';
import { BookClub } from '../entity/BookClub';
import { User } from '../entity/User';
import { authenticateToken } from '../middleware/authenticate';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const discussionRepository = AppDataSource.getRepository(Discussion);
  const discussions = await discussionRepository.find({ relations: ['bookClub', 'author', 'posts'] });
  res.json(discussions);
});

router.get('/:id', async (req: Request, res: Response) => {
  const discussionRepository = AppDataSource.getRepository(Discussion);
  const discussion = await discussionRepository.findOne({
    where: { id: parseInt(req.params.id, 10) },
    relations: ['bookClub', 'author', 'posts'],
  });
  if (discussion) {
    res.json(discussion);
  } else {
    res.status(404).send('Discussion not found');
  }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const discussionRepository = AppDataSource.getRepository(Discussion);
  const { bookClubId, title, authorId } = req.body;
  const bookClubRepository = AppDataSource.getRepository(BookClub);
  const userRepository = AppDataSource.getRepository(User);

  const bookClub = await bookClubRepository.findOneBy({ id: bookClubId });
  const author = await userRepository.findOneBy({ id: authorId });

  if (bookClub && author) {
    const discussion = discussionRepository.create({ bookClub, title, author });
    await discussionRepository.save(discussion);
    res.status(201).json(discussion);
  } else {
    res.status(400).send('Invalid book club or author');
  }
});

router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  const discussionRepository = AppDataSource.getRepository(Discussion);
  const discussion = await discussionRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (discussion) {
    discussionRepository.merge(discussion, req.body);
    await discussionRepository.save(discussion);
    res.json(discussion);
  } else {
    res.status(404).send('Discussion not found');
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  const discussionRepository = AppDataSource.getRepository(Discussion);
  const discussion = await discussionRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (discussion) {
    await discussionRepository.remove(discussion);
    res.status(204).send();
  } else {
    res.status(404).send('Discussion not found');
  }
});

export default router;
