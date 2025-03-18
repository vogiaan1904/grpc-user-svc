import { BaseEntity } from 'src/entities/base.entity';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { FindAllResponse } from 'src/modules/user/types/common.type';
import { BaseRepositoryInterface } from './base.interface.repo';
export declare abstract class BaseRepositoryAbstract<T extends BaseEntity> implements BaseRepositoryInterface<T> {
    private readonly model;
    protected constructor(model: Model<T>);
    create(dto: T | any): Promise<T>;
    findById(id: string): Promise<T>;
    findOne(condition?: {}): Promise<T>;
    findAll(condition: FilterQuery<T>, options?: QueryOptions<T>): Promise<FindAllResponse<T>>;
    update(id: string, dto: Partial<T>): Promise<T>;
    softDelete(id: string): Promise<boolean>;
    permanentlyDelete(id: string): Promise<boolean>;
}
