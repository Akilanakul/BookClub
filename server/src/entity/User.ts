// src/entity/User.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
  } from 'typeorm';
  import { BookClub } from './BookClub';
  import { Post } from './Post';
  import { Profile } from './Profile';
  import { Discussion } from './Discussion';
  import { ReadingList } from './ReadingList';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ unique: true })
    username!: string;
  
    @Column({ unique: true })
    email!: string;
  
    @Column()
    password!: string;
  
    @Column(() => Profile)
    profile!: Profile;
  
    @ManyToMany(() => BookClub, bookClub => bookClub.members)
    bookClubs!: BookClub[];
  
    @OneToMany(() => Post, post => post.user)
    posts!: Post[];
  
    @OneToMany(() => Discussion, discussion => discussion.author)
    discussions!: Discussion[];
  
    @OneToMany(() => ReadingList, readingList => readingList.user)
    readingList!: ReadingList[];
  }
  