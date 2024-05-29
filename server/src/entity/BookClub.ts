// src/entity/BookClub.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany
  } from 'typeorm';
  import { User } from './User';
  import { Discussion } from './Discussion';
  
  @Entity()
  export class BookClub {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column({ nullable: true })
    description?: string;
  
    @ManyToMany(() => User, user => user.bookClubs)
    members!: User[];
  
    @OneToMany(() => Discussion, discussion => discussion.bookClub)
    discussions!: Discussion[];
  }
  