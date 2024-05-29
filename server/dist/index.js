"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./data-source");
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const bookClub_1 = __importDefault(require("./routes/bookClub"));
const discussion_1 = __importDefault(require("./routes/discussion"));
const post_1 = __importDefault(require("./routes/post"));
const book_1 = __importDefault(require("./routes/book"));
const readingList_1 = __importDefault(require("./routes/readingList"));
data_source_1.AppDataSource.initialize()
    .then(() => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use('/auth', auth_1.default);
    app.use('/profile', profile_1.default);
    app.use('/book-club', bookClub_1.default);
    app.use('/discussion', discussion_1.default);
    app.use('/post', post_1.default);
    app.use('/book', book_1.default);
    app.use('/reading-list', readingList_1.default);
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
    .catch((error) => console.log(error));
