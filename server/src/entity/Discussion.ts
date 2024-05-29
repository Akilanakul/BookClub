// src/entity/Discussion.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany
  } from 'typeorm';
  import { BookClub } from './BookClub';
  import { User } from './User';
  import { Post } from './Post';
  
  @Entity()
  export class Discussion {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => BookClub, bookClub => bookClub.discussions)
    bookClub!: BookClub;
  
    @Column()
    title!: string;
  
    @ManyToOne(() => User, user => user.discussions)
    author!: User;
  
    @OneToMany(() => Post, post => post.discussion)
    posts!: Post[];
  }
  