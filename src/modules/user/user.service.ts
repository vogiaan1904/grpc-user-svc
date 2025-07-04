import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { User } from '../../entities/user.entity';
import {
  CreateUserResponse,
  DeleteUserRequest,
  FindAllResponse,
  FindOneRequest,
  FindOneResponse,
} from '../../protos/user.pb';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UsersRepository } from './repositories/base/user.repo';
import { RpcInvalidArgumentException, RpcNotFoundException } from 'src/common/exceptions/rpc.exception';
import { UpdateUserProfileDto } from './dto';
import { UserErrors } from 'src/constants/error.constant';

@Injectable()
export class UserService {
  constructor(private readonly repository: UsersRepository) {}

  async create(dto: CreateUserRequestDto): Promise<CreateUserResponse> {
    const user: User = await this.repository.create(dto);
    return { user };
  }

  async findById({ id }: FindOneRequest): Promise<FindOneResponse> {
    const user: User = await this.repository.findById(id);
    if (!user) {
      throw new RpcNotFoundException(UserErrors.USER_NOT_FOUND);
    }

    return { user };
  }

  async findByEmail({ email }: FindOneRequest): Promise<FindOneResponse> {
    const user: User = await this.repository.findOne({ email });
    if (!user) {
      throw new RpcNotFoundException(UserErrors.USER_NOT_FOUND);
    }

    return { user };
  }

  async findAll(): Promise<FindAllResponse> {
    const response = await this.repository.findAll({});
    return {
      users: response.items,
    };
  }

  async updateProfile({ id, ...data }: UpdateUserProfileDto): Promise<void> {
    console.log('data: ', data);
    const user: User = await this.repository.findById(id);
    if (!user) {
      throw new RpcNotFoundException(UserErrors.USER_NOT_FOUND);
    }

    const updatedUser = await this.repository.update(id, data);
    console.log('Updated user:', updatedUser);
  }

  async delete({ id }: DeleteUserRequest): Promise<void> {
    const user: User = await this.repository.findById(id);
    if (!user) {
      throw new RpcNotFoundException(UserErrors.USER_NOT_FOUND);
    }

    await this.repository.softDelete(id);
  }
}
