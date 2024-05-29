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
// src/routes/readingList.ts
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const ReadingList_1 = require("../entity/ReadingList");
const User_1 = require("../entity/User");
const Book_1 = require("../entity/Book");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.get('/', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readingListRepository = data_source_1.AppDataSource.getRepository(ReadingList_1.ReadingList);
    const readingList = yield readingListRepository.find({ relations: ['user', 'book'] });
    res.json(readingList);
}));
router.get('/:userId', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readingListRepository = data_source_1.AppDataSource.getRepository(ReadingList_1.ReadingList);
    const userReadingList = yield readingListRepository.find({
        where: { user: { id: parseInt(req.params.userId, 10) } },
        relations: ['book'],
    });
    res.json(userReadingList);
}));
router.post('/', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readingListRepository = data_source_1.AppDataSource.getRepository(ReadingList_1.ReadingList);
    const { userId, bookId, status } = req.body;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
    const user = yield userRepository.findOneBy({ id: userId });
    const book = yield bookRepository.findOneBy({ id: bookId });
    if (user && book) {
        const readingList = readingListRepository.create({ user, book, status });
        yield readingListRepository.save(readingList);
        res.status(201).json(readingList);
    }
    else {
        res.status(400).send('Invalid user or book');
    }
}));
router.put('/:id', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readingListRepository = data_source_1.AppDataSource.getRepository(ReadingList_1.ReadingList);
    const readingList = yield readingListRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (readingList) {
        readingListRepository.merge(readingList, req.body);
        yield readingListRepository.save(readingList);
        res.json(readingList);
    }
    else {
        res.status(404).send('Reading list item not found');
    }
}));
router.delete('/:id', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readingListRepository = data_source_1.AppDataSource.getRepository(ReadingList_1.ReadingList);
    const readingList = yield readingListRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (readingList) {
        yield readingListRepository.remove(readingList);
        res.status(204).send();
    }
    else {
        res.status(404).send('Reading list item not found');
    }
}));
exports.default = router;
