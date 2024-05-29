"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Profile_1 = require("./entity/Profile");
const BookClub_1 = require("./entity/BookClub");
const Discussion_1 = require("./entity/Discussion");
const Post_1 = require("./entity/Post");
const Book_1 = require("./entity/Book");
const ReadingList_1 = require("./entity/ReadingList");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: './database.sqlite',
    synchronize: true,
    logging: false,
    entities: [User_1.User, Profile_1.Profile, BookClub_1.BookClub, Discussion_1.Discussion, Post_1.Post, Book_1.Book, ReadingList_1.ReadingList],
    migrations: [],
    subscribers: [],
});
