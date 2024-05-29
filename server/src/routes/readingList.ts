// src/routes/readingList.ts
import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ReadingList } from '../entity/ReadingList';
import { User } from '../entity/User';
import { Book } from '../entity/Book';
import { authenticateToken } from '../middleware/authenticate';

const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const readingListRepository = AppDataSource.getRepository(ReadingList);
  const readingList = await readingListRepository.find({ relations: ['user', 'book'] });
  res.json(readingList);
});

router.get('/:userId', authenticateToken, async (req: Request, res: Response) => {
  const readingListRepository = AppDataSource.getRepository(ReadingList);
  const userReadingList = await readingListRepository.find({
    where: { user: { id: parseInt(req.params.userId, 10) } },
    relations: ['book'],
  });
  res.json(userReadingList);
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const readingListRepository = AppDataSource.getRepository(ReadingList);
  const { userId, bookId, status } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const bookRepository = AppDataSource.getRepository(Book);

  const user = await userRepository.findOneBy({ id: userId });
  const book = await bookRepository.findOneBy({ id: bookId });

  if (user && book) {
    const readingList = readingListRepository.create({ user, book, status });
    await readingListRepository.save(readingList);
    res.status(201).json(readingList);
  } else {
    res.status(400).send('Invalid user or book');
  }
});

router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  const readingListRepository = AppDataSource.getRepository(ReadingList);
  const readingList = await readingListRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (readingList) {
    readingListRepository.merge(readingList, req.body);
    await readingListRepository.save(readingList);
    res.json(readingList);
  } else {
    res.status(404).send('Reading list item not found');
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  const readingListRepository = AppDataSource.getRepository(ReadingList);
  const readingList = await readingListRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (readingList) {
    await readingListRepository.remove(readingList);
    res.status(204).send();
  } else {
    res.status(404).send('Reading list item not found');
  }
});

export default router;
