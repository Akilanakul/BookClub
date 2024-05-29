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
exports.Discussion = void 0;
// src/entity/Discussion.ts
const typeorm_1 = require("typeorm");
const BookClub_1 = require("./BookClub");
const User_1 = require("./User");
const Post_1 = require("./Post");
let Discussion = class Discussion {
};
exports.Discussion = Discussion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Discussion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BookClub_1.BookClub, bookClub => bookClub.discussions),
    __metadata("design:type", BookClub_1.BookClub)
], Discussion.prototype, "bookClub", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Discussion.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.discussions),
    __metadata("design:type", User_1.User)
], Discussion.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Post_1.Post, post => post.discussion),
    __metadata("design:type", Array)
], Discussion.prototype, "posts", void 0);
exports.Discussion = Discussion = __decorate([
    (0, typeorm_1.Entity)()
], Discussion);
