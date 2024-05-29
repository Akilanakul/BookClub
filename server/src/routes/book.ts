// src/routes/book.ts
import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Book } from '../entity/Book';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const bookRepository = AppDataSource.getRepository(Book);
  const books = await bookRepository.find();
  res.json(books);
});

router.get('/:id', async (req: Request, res: Response) => {
  const bookRepository = AppDataSource.getRepository(Book);
  const book = await bookRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

router.post('/', async (req: Request, res: Response) => {
  const bookRepository = AppDataSource.getRepository(Book);
  const book = bookRepository.create(req.body);
  await bookRepository.save(book);
  res.status(201).json(book);
});

router.put('/:id', async (req: Request, res: Response) => {
  const bookRepository = AppDataSource.getRepository(Book);
  const book = await bookRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (book) {
    bookRepository.merge(book, req.body);
    await bookRepository.save(book);
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const bookRepository = AppDataSource.getRepository(Book);
  const book = await bookRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (book) {
    await bookRepository.remove(book);
    res.status(204).send();
  } else {
    res.status(404).send('Book not found');
  }
});

export default router;
