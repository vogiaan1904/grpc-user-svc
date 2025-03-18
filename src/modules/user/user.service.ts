import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UpdateUserProfileDto } from './dto';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UsersRepository } from './repositories/base/user.repo';
import {
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  FindOneResponse,
  UpdateUserResponse,
} from './user.pb';

@Injectable()
export class UserService {
  constructor(private readonly repository: UsersRepository) {}

  async create(dto: CreateUserRequestDto): Promise<CreateUserResponse> {
    const user: User = await this.repository.create(dto);
    return { status: HttpStatus.CREATED, error: null, id: user.id };
  }

  async findById({ id }: FindOneRequest): Promise<FindOneResponse> {
    try {
      const user: User = await this.repository.findById(id);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          error: ['User not found'],
          data: null,
        };
      }
      return { status: HttpStatus.OK, error: null, data: user };
    } catch (error) {
      console.error('Error in findById:', error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: [error.message],
        data: null,
      };
    }
  }

  async findByEmail({ email }: FindOneRequest): Promise<FindOneResponse> {
    try {
      const user: User = await this.repository.findOne({ email });
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          error: ['User not found'],
          data: null,
        };
      }
      return { status: HttpStatus.OK, error: null, data: user };
    } catch (error) {
      console.error('Error in findByEmail:', error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: [error.message],
        data: null,
      };
    }
  }

  async findAll(dto: FindAllRequest): Promise<FindAllResponse> {
    const { page, limit } = dto;
    try {
      const users = await this.repository.findAllWithPagination(
        {},
        {
          page,
          limit,
          populate: [],
          sort: { created_at: -1 },
        },
      );
      return {
        status: HttpStatus.OK,
        error: null,
        data: users.docs,
        total: users.totalDocs,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: [error.message],
        data: [],
        total: 0,
      };
    }
  }

  async updateProfile({
    id,
    ...data
  }: UpdateUserProfileDto): Promise<UpdateUserResponse> {
    const user: User = await this.repository.findById(id);

    if (!user) {
      return { status: HttpStatus.NOT_FOUND, error: ['User not found'] };
    }
    try {
      await this.repository.update(id, data);
      return { status: HttpStatus.OK, error: null };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: [error.message],
      };
    }
  }

  async delete({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user: User = await this.repository.findById(id);

    if (!user) {
      return { status: HttpStatus.NOT_FOUND, error: ['User not found'] };
    }
    try {
      await this.repository.softDelete(id);
      return { status: HttpStatus.OK, error: null };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: [error.message],
      };
    }
  }
}
