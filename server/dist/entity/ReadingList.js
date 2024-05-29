"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingList = void 0;
// src/entity/ReadingList.ts
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Book_1 = require("./Book");
let ReadingList = class ReadingList {
};
exports.ReadingList = ReadingList;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReadingList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.readingList),
    __metadata("design:type", User_1.User)
], ReadingList.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Book_1.Book, book => book.readingList),
    __metadata("design:type", Book_1.Book)
], ReadingList.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReadingList.prototype, "status", void 0);
exports.ReadingList = ReadingList = __decorate([
    (0, typeorm_1.Entity)()
], ReadingList);
