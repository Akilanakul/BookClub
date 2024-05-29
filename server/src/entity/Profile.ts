// src/entity/Profile.ts
import { Column } from 'typeorm';

export class Profile {
  @Column()
  name!: string;

  @Column("simple-array")
  reading_preferences!: string[];
}
