// src/entity/Post.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
  } from 'typeorm';
  import { Discussion } from './Discussion';
  import { User } from './User';
  
  @Entity()
  export class Post {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => Discussion, discussion => discussion.posts)
    discussion!: Discussion;
  
    @ManyToOne(() => User, user => user.posts)
    user!: User;
  
    @Column()
    content!: string;
  }
  