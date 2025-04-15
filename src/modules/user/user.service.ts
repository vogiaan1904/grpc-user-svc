import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UpdateUserProfileDto } from './dto';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UsersRepository } from './repositories/base/user.repo';
import {
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  ErrorCode,
  FindAllResponse,
  FindOneRequest,
  FindOneResponse,
  UpdateUserResponse,
} from '../../protos/user.pb';
import { UserErrors } from 'src/common/constants/errors.constant';

@Injectable()
export class UserService {
  constructor(private readonly repository: UsersRepository) {}

  async create(dto: CreateUserRequestDto): Promise<CreateUserResponse> {
    const user: User = await this.repository.create(dto);
    return { id: user.id, error: UserErrors.OK };
  }

  async findById({ id }: FindOneRequest): Promise<FindOneResponse> {
    const user: User = await this.repository.findById(id);
    if (!user) {
      return {
        error: UserErrors.USER_NOT_FOUND,
        data: null,
      };
    }
    return { error: UserErrors.OK, data: user };
  }

  async findByEmail({ email }: FindOneRequest): Promise<FindOneResponse> {
    const user: User = await this.repository.findOne({ email });
    if (!user) {
      return {
        error: UserErrors.USER_NOT_FOUND,
        data: null,
      };
    }
    return { error: UserErrors.OK, data: user };
  }

  async findAll(): Promise<FindAllResponse> {
    const response = await this.repository.findAll({});
    return {
      error: UserErrors.OK,
      data: response.items,
    };
  }

  async updateProfile({
    id,
    ...data
  }: UpdateUserProfileDto): Promise<UpdateUserResponse> {
    const user: User = await this.repository.findById(id);

    if (!user) {
      return {
        error: UserErrors.USER_NOT_FOUND,
      };
    }
    await this.repository.update(id, data);
    return { error: UserErrors.OK };
  }

  async delete({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user: User = await this.repository.findById(id);

    if (!user) {
      return {
        error: UserErrors.USER_NOT_FOUND,
      };
    }
    await this.repository.softDelete(id);
    return { error: UserErrors.OK };
  }
}
