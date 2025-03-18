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
exports.UserController = exports.GrpcExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const microservices_1 = require("@nestjs/microservices");
const user_pb_1 = require("./user.pb");
const find_one_user_request_dto_1 = require("./dto/find-one-user.request.dto");
const rxjs_1 = require("rxjs");
const dto_1 = require("./dto");
const delete_user_request_dto_1 = require("./dto/delete-user.request.dto");
let GrpcExceptionFilter = class GrpcExceptionFilter {
    catch(exception, host) {
        return (0, rxjs_1.throwError)(() => exception.getError());
    }
};
exports.GrpcExceptionFilter = GrpcExceptionFilter;
exports.GrpcExceptionFilter = GrpcExceptionFilter = __decorate([
    (0, common_1.Catch)(microservices_1.RpcException)
], GrpcExceptionFilter);
let UserController = class UserController {
    async createUser(payload) {
        return this.service.create(payload);
    }
    async findOne(payload) {
        if (payload.email) {
            return this.service.findByEmail(payload);
        }
        if (payload.id) {
            return this.service.findById(payload);
        }
    }
    async findAll(payload) {
        return this.service.findAll(payload);
    }
    async updateUser(payload) {
        return this.service.updateProfile(payload);
    }
    async deleteUser(payload) {
        return this.service.delete(payload);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "service", void 0);
__decorate([
    (0, microservices_1.GrpcMethod)(user_pb_1.USER_SERVICE_NAME, 'CreateUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.GrpcMethod)(user_pb_1.USER_SERVICE_NAME, 'FindOne'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_one_user_request_dto_1.FindOneRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)(user_pb_1.USER_SERVICE_NAME, 'FindAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.GrpcMethod)(user_pb_1.USER_SERVICE_NAME, 'UpdateUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.GrpcMethod)(user_pb_1.USER_SERVICE_NAME, 'DeleteUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_user_request_dto_1.DeleteUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseFilters)(GrpcExceptionFilter),
    (0, common_1.Controller)('user')
], UserController);
//# sourceMappingURL=user.controller.js.map