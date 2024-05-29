"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/post.ts
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Post_1 = require("../entity/Post");
const Discussion_1 = require("../entity/Discussion");
const User_1 = require("../entity/User");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postRepository = data_source_1.AppDataSource.getRepository(Post_1.Post);
    const posts = yield postRepository.find({ relations: ['discussion', 'user'] });
    res.json(posts);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postRepository = data_source_1.AppDataSource.getRepository(Post_1.Post);
    const post = yield postRepository.findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: ['discussion', 'user'],
    });
    if (post) {
        res.json(post);
    }
    else {
        res.status(404).send('Post not found');
    }
}));
router.post('/', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postRepository = data_source_1.AppDataSource.getRepository(Post_1.Post);
    const { discussionId, userId, content } = req.body;
    const discussionRepository = data_source_1.AppDataSource.getRepository(Discussion_1.Discussion);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const discussion = yield discussionRepository.findOneBy({ id: discussionId });
    const user = yield userRepository.findOneBy({ id: userId });
    if (discussion && user) {
        const post = postRepository.create({ discussion, user, content });
        yield postRepository.save(post);
        res.status(201).json(post);
    }
    else {
        res.status(400).send('Invalid discussion or user');
    }
}));
router.put('/:id', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postRepository = data_source_1.AppDataSource.getRepository(Post_1.Post);
    const post = yield postRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (post) {
        postRepository.merge(post, req.body);
        yield postRepository.save(post);
        res.json(post);
    }
    else {
        res.status(404).send('Post not found');
    }
}));
router.delete('/:id', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postRepository = data_source_1.AppDataSource.getRepository(Post_1.Post);
    const post = yield postRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (post) {
        yield postRepository.remove(post);
        res.status(204).send();
    }
    else {
        res.status(404).send('Post not found');
    }
}));
exports.default = router;
