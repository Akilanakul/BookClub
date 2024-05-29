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
require("reflect-metadata");
const data_source_1 = require("./data-source");
const User_1 = require("./entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize();
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const users = [
        {
            username: "booklover1",
            email: "booklover1@example.com",
            password: yield bcrypt_1.default.hash("hashedpassword1", 10),
            profile: {
                name: "Alice Johnson",
                reading_preferences: ["Fiction", "Mystery", "Science Fiction"],
            },
        },
        {
            username: "literaturefan",
            email: "literaturefan@example.com",
            password: yield bcrypt_1.default.hash("hashedpassword2", 10),
            profile: {
                name: "Bob Smith",
                reading_preferences: ["Non-Fiction", "Biography", "History"],
            },
        },
        {
            username: "novelenthusiast",
            email: "novelenthusiast@example.com",
            password: yield bcrypt_1.default.hash("hashedpassword3", 10),
            profile: {
                name: "Charlie Brown",
                reading_preferences: ["Fantasy", "Adventure", "Young Adult"],
            },
        },
    ];
    for (const userData of users) {
        const user = userRepository.create(userData);
        yield userRepository.save(user);
    }
    console.log('Seed data inserted');
    yield data_source_1.AppDataSource.destroy();
});
seed().catch(error => console.error(error));
