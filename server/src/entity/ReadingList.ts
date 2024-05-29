// src/entity/ReadingList.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class ReadingList {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.readingList)
  user!: User;

  @ManyToOne(() => Book, book => book.readingList)
  book!: Book;

  @Column()
  status!: string;
}
