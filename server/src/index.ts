// src/index.ts
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import bookClubRoutes from './routes/bookClub';
import discussionRoutes from './routes/discussion';
import postRoutes from './routes/post';
import bookRoutes from './routes/book';
import readingListRoutes from './routes/readingList';

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());

    app.use('/auth', authRoutes);
    app.use('/profile', profileRoutes);
    app.use('/book-club', bookClubRoutes);
    app.use('/discussion', discussionRoutes);
    app.use('/post', postRoutes);
    app.use('/book', bookRoutes);
    app.use('/reading-list', readingListRoutes);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => console.log(error));
