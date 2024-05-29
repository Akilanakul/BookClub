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
// src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entity/User");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const { username, email, password, profile } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = userRepository.create({ username, email, password: hashedPassword, profile });
    yield userRepository.save(user);
    res.status(201).send('User created');
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const { email, password } = req.body;
    const user = yield userRepository.findOneBy({ email });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        const token = jsonwebtoken_1.default.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        res.status(401).send('Invalid credentials');
    }
}));
router.post('/logout', (req, res) => {
    // Handle logout (e.g., by invalidating the token on the client side)
    res.status(200).send('Logged out');
});
exports.default = router;
