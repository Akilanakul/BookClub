import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { User } from './entity/User';
import bcrypt from 'bcrypt';

const seed = async () => {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);

  const users = [
    {
      username: "booklover1",
      email: "booklover1@example.com",
      password: await bcrypt.hash("hashedpassword1", 10),
      profile: {
        name: "Alice Johnson",
        reading_preferences: ["Fiction", "Mystery", "Science Fiction"],
      },
    },
    {
      username: "literaturefan",
      email: "literaturefan@example.com",
      password: await bcrypt.hash("hashedpassword2", 10),
      profile: {
        name: "Bob Smith",
        reading_preferences: ["Non-Fiction", "Biography", "History"],
      },
    },
    {
      username: "novelenthusiast",
      email: "novelenthusiast@example.com",
      password: await bcrypt.hash("hashedpassword3", 10),
      profile: {
        name: "Charlie Brown",
        reading_preferences: ["Fantasy", "Adventure", "Young Adult"],
      },
    },
  ];

  for (const userData of users) {
    const user = userRepository.create(userData);
    await userRepository.save(user);
  }

  console.log('Seed data inserted');
  await AppDataSource.destroy();
};

seed().catch(error => console.error(error));
