import { ArgumentsHost, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
export declare class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost): any;
}
export declare class UserController {
    private readonly service;
    private createUser;
    private findOne;
    private findAll;
    private updateUser;
    private deleteUser;
}
