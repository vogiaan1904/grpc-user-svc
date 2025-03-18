import { User, UserDocument } from '../../../../entities/user.entity';
import { UserRepositoryInterface } from '../../interfaces/user.interface';
import { FilterQuery, PaginateModel } from 'mongoose';
import { BaseRepositoryAbstract } from './base.abstract.repo';
export declare class UsersRepository extends BaseRepositoryAbstract<UserDocument> implements UserRepositoryInterface {
    private readonly userModel;
    constructor(userModel: PaginateModel<UserDocument>);
    findAllWithPagination(filter: FilterQuery<UserDocument>, options: {
        page: number;
        limit: number;
        populate: string[] | string;
        sort: string | object;
    }): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
}
