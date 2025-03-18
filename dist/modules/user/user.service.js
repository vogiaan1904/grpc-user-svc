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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repo_1 = require("./repositories/base/user.repo");
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(dto) {
        const user = await this.repository.create(dto);
        return { status: common_1.HttpStatus.CREATED, error: null, id: user.id };
    }
    async findById({ id }) {
        try {
            const user = await this.repository.findById(id);
            if (!user) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: ['User not found'],
                    data: null,
                };
            }
            return { status: common_1.HttpStatus.OK, error: null, data: user };
        }
        catch (error) {
            console.error('Error in findById:', error);
            return {
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: [error.message],
                data: null,
            };
        }
    }
    async findByEmail({ email }) {
        try {
            const user = await this.repository.findOne({ email });
            if (!user) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: ['User not found'],
                    data: null,
                };
            }
            return { status: common_1.HttpStatus.OK, error: null, data: user };
        }
        catch (error) {
            console.error('Error in findByEmail:', error);
            return {
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: [error.message],
                data: null,
            };
        }
    }
    async findAll(dto) {
        const { page, limit } = dto;
        try {
            const users = await this.repository.findAllWithPagination({}, {
                page,
                limit,
                populate: [],
                sort: { created_at: -1 },
            });
            return {
                status: common_1.HttpStatus.OK,
                error: null,
                data: users.docs,
                total: users.totalDocs,
            };
        }
        catch (error) {
            return {
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: [error.message],
                data: [],
                total: 0,
            };
        }
    }
    async updateProfile({ id, ...data }) {
        const user = await this.repository.findById(id);
        if (!user) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: ['User not found'] };
        }
        try {
            await this.repository.update(id, data);
            return { status: common_1.HttpStatus.OK, error: null };
        }
        catch (error) {
            return {
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: [error.message],
            };
        }
    }
    async delete({ id }) {
        const user = await this.repository.findById(id);
        if (!user) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: ['User not found'] };
        }
        try {
            await this.repository.softDelete(id);
            return { status: common_1.HttpStatus.OK, error: null };
        }
        catch (error) {
            return {
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: [error.message],
            };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repo_1.UsersRepository])
], UserService);
//# sourceMappingURL=user.service.js.map