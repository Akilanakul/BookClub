// src/routes/post.ts
import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Post } from '../entity/Post';
import { Discussion } from '../entity/Discussion';
import { User } from '../entity/User';
import { authenticateToken } from '../middleware/authenticate';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post);
  const posts = await postRepository.find({ relations: ['discussion', 'user'] });
  res.json(posts);
});

router.get('/:id', async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post);
  const post = await postRepository.findOne({
    where: { id: parseInt(req.params.id, 10) },
    relations: ['discussion', 'user'],
  });
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post);
  const { discussionId, userId, content } = req.body;
  const discussionRepository = AppDataSource.getRepository(Discussion);
  const userRepository = AppDataSource.getRepository(User);

  const discussion = await discussionRepository.findOneBy({ id: discussionId });
  const user = await userRepository.findOneBy({ id: userId });

  if (discussion && user) {
    const post = postRepository.create({ discussion, user, content });
    await postRepository.save(post);
    res.status(201).json(post);
  } else {
    res.status(400).send('Invalid discussion or user');
  }
});

router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post);
  const post = await postRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (post) {
    postRepository.merge(post, req.body);
    await postRepository.save(post);
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post);
  const post = await postRepository.findOneBy({ id: parseInt(req.params.id, 10) });
  if (post) {
    await postRepository.remove(post);
    res.status(204).send();
  } else {
    res.status(404).send('Post not found');
  }
});

export default router;
