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
// src/routes/discussion.ts
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Discussion_1 = require("../entity/Discussion");
const BookClub_1 = require("../entity/BookClub");
const User_1 = require("../entity/User");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const discussionRepository = data_source_1.AppDataSource.getRepository(Discussion_1.Discussion);
    const discussions = yield discussionRepository.find({ relations: ['bookClub', 'author', 'posts'] });
    res.json(discussions);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const discussionRepository = data_source_1.AppDataSource.getRepository(Discussion_1.Discussion);
    const discussion = yield discussionRepository.findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: ['bookClub', 'author', 'posts'],
    });
    if (discussion) {
        res.json(discussion);
    }
    else {
        res.status(404).send('Discussion not found');
    }
}));
router.post('/', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const discussionRepository = data_source_1.AppDataSource.getRepository(Discussion_1.Discussion);
    const { bookClubId, title, authorId } = req.body;
    const bookClubRepository = data_source_1.AppDataSource.getRepository(BookClub_1.BookClub);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const bookClub = yield bookClubRepository.findOneBy({ id: bookClubId });
    const author = yield userRepository.findOneBy({ id: authorId });
    if (bookClub && author) {
        const discussion = discussionRepository.create({ bookClub, title, author });
        yield discussionRepository.save(discussion);
        res.status(201).json(discussion);
    }
    else {
        res.status(400).send('Invalid book club or author');
    }
}));
router.put('/:id', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const discussionRepository = data_source_1.AppDataSource.getRepository(Discussion_1.Discussion);
    const discussion = yield discussionRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (discussion) {
        discussionRepository.merge(discussion, req.body);
        yield discussionRepository.save(discussion);
        res.json(discussion);
    }
    else {
        res.status(404).send('Discussion not found');
    }
}));
router.delete('/:id', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const discussionRepository = data_source_1.AppDataSource.getRepository(Discussion_1.Discussion);
    const discussion = yield discussionRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (discussion) {
        yield discussionRepository.remove(discussion);
        res.status(204).send();
    }
    else {
        res.status(404).send('Discussion not found');
    }
}));
exports.default = router;
