import { Exclude, Expose } from 'class-transformer';
import { Address } from '../../../entities/address.entity';
import { Gender, User } from '../../../entities';

export class UserResponseDto implements User {
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  gender: Gender;

  @Expose()
  avatar: string;

  @Expose()
  addresses: Address[];

  @Exclude()
  deleted_at: Date;
}
