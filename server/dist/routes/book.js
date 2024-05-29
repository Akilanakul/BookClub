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
// src/routes/book.ts
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Book_1 = require("../entity/Book");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
    const books = yield bookRepository.find();
    res.json(books);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
    const book = yield bookRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (book) {
        res.json(book);
    }
    else {
        res.status(404).send('Book not found');
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
    const book = bookRepository.create(req.body);
    yield bookRepository.save(book);
    res.status(201).json(book);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
    const book = yield bookRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (book) {
        bookRepository.merge(book, req.body);
        yield bookRepository.save(book);
        res.json(book);
    }
    else {
        res.status(404).send('Book not found');
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
    const book = yield bookRepository.findOneBy({ id: parseInt(req.params.id, 10) });
    if (book) {
        yield bookRepository.remove(book);
        res.status(204).send();
    }
    else {
        res.status(404).send('Book not found');
    }
}));
exports.default = router;
