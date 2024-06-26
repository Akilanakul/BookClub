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
// src/routes/profile.ts
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.get('/profile', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const user = yield userRepository.findOneBy({ id: req.user.id });
    res.json(user);
}));
router.put('/profile', authenticate_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const { username, email, profile } = req.body;
    yield userRepository.update(req.user.id, { username, email, profile });
    res.status(200).send('Profile updated');
}));
exports.default = router;
