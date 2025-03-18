import { Gender } from '../../../entities/user.entity';
export declare class CreateUserRequestDto {
    email: string;
    lastName: string;
    firstName: string;
    password: string;
    gender: Gender;
}
