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
// src/routes/bookClub.ts
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const BookClub_1 = require("../entity/BookClub");
const User_1 = require("../entity/User");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookClubRepository = data_source_1.AppDataSource.getRepository(BookClub_1.BookClub);
    const bookClubs = yield bookClubRepository.find({ relations: ['members'] });
    res.json(bookClubs);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookClubRepository = data_source_1.AppDataSource.getRepository(BookClub_1.BookClub);
    const bookClub = yield bookClubRepository.findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: ['members'],
    });
    if (bookClub) {
        res.json(bookClub);
    }
    else {
        res.status(404).send('Book club not found');
    }
}));
router.post('/', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookClubRepository = data_source_1.AppDataSource.getRepository(BookClub_1.BookClub);
    const { name, description } = req.body;
    const bookClub = bookClubRepository.create({ name, description });
    yield bookClubRepository.save(bookClub);
    res.status(201).json(bookClub);
}));
router.put('/:id', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookClubRepository = data_source_1.AppDataSource.getRepository(BookClub_1.BookClub);
    const bookClub = yield bookClubRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (bookClub) {
        bookClubRepository.merge(bookClub, req.body);
        yield bookClubRepository.save(bookClub);
        res.json(bookClub);
    }
    else {
        res.status(404).send('Book club not found');
    }
}));
router.delete('/:id', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookClubRepository = data_source_1.AppDataSource.getRepository(BookClub_1.BookClub);
    const bookClub = yield bookClubRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (bookClub) {
        yield bookClubRepository.remove(bookClub);
        res.status(204).send();
    }
    else {
        res.status(404).send('Book club not found');
    }
}));
router.post('/:id/join', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookClubRepository = data_source_1.AppDataSource.getRepository(BookClub_1.BookClub);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const bookClub = yield bookClubRepository.findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: ['members'],
    });
    if (bookClub) {
        const user = yield userRepository.findOneBy({ id: req.user.id });
        if (user) {
            bookClub.members.push(user);
            yield bookClubRepository.save(bookClub);
            res.status(200).send('Joined book club');
        }
        else {
            res.status(404).send('User not found');
        }
    }
    else {
        res.status(404).send('Book club not found');
    }
}));
router.post('/:id/leave', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookClubRepository = data_source_1.AppDataSource.getRepository(BookClub_1.BookClub);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const bookClub = yield bookClubRepository.findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: ['members'],
    });
    if (bookClub) {
        const user = yield userRepository.findOneBy({ id: req.user.id });
        if (user) {
            bookClub.members = bookClub.members.filter(member => member.id !== user.id);
            yield bookClubRepository.save(bookClub);
            res.status(200).send('Left book club');
        }
        else {
            res.status(404).send('User not found');
        }
    }
    else {
        res.status(404).send('Book club not found');
    }
}));
exports.default = router;
