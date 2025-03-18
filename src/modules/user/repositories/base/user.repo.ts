import { User, UserDocument } from '../../../../entities/user.entity';
import { UserRepositoryInterface } from '../../interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel } from 'mongoose';
import { BaseRepositoryAbstract } from './base.abstract.repo';

@Injectable()
export class UsersRepository
  extends BaseRepositoryAbstract<UserDocument>
  implements UserRepositoryInterface
{
  constructor(
    @InjectModel(User.name)
    private readonly userModel: PaginateModel<UserDocument>,
  ) {
    super(userModel);
  }

  async findAllWithPagination(
    filter: FilterQuery<UserDocument>,
    options: {
      page: number;
      limit: number;
      populate: string[] | string;
      sort: string | object;
    },
  ) {
    return await this.userModel.paginate(filter, options);
  }
}
