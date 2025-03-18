import { UpdateUserProfileDto } from './dto';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UsersRepository } from './repositories/base/user.repo';
import { CreateUserResponse, DeleteUserRequest, DeleteUserResponse, FindAllRequest, FindAllResponse, FindOneRequest, FindOneResponse, UpdateUserResponse } from './user.pb';
export declare class UserService {
    private readonly repository;
    constructor(repository: UsersRepository);
    create(dto: CreateUserRequestDto): Promise<CreateUserResponse>;
    findById({ id }: FindOneRequest): Promise<FindOneResponse>;
    findByEmail({ email }: FindOneRequest): Promise<FindOneResponse>;
    findAll(dto: FindAllRequest): Promise<FindAllResponse>;
    updateProfile({ id, ...data }: UpdateUserProfileDto): Promise<UpdateUserResponse>;
    delete({ id }: DeleteUserRequest): Promise<DeleteUserResponse>;
}
