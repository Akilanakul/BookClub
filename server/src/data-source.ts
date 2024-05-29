// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Profile } from './entity/Profile';
import { BookClub } from './entity/BookClub';
import { Discussion } from './entity/Discussion';
import { Post } from './entity/Post';
import { Book } from './entity/Book';
import { ReadingList } from './entity/ReadingList';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, Profile, BookClub, Discussion, Post, Book, ReadingList],
  migrations: [],
  subscribers: [],
});
