import { User } from '../../../entities/user.entity';
import { BaseRepositoryInterface } from '../repositories/base/base.interface.repo';
export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
}
