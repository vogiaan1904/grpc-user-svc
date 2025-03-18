import { Address } from '../../../entities/address.entity';
import { Gender, User } from '../../../entities';
export declare class UserResponseDto implements User {
    constructor(partial: Partial<UserResponseDto>);
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: Gender;
    avatar: string;
    addresses: Address[];
    deleted_at: Date;
}
