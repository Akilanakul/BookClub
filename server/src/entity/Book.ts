// src/entity/Book.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReadingList } from './ReadingList';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column()
  genre!: string;

  @Column()
  cover_image!: string;

  @OneToMany(() => ReadingList, readingList => readingList.book)
  readingList!: ReadingList[];
}
