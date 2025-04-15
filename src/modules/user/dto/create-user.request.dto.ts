import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender, Role } from '../../../entities/user.entity';
import { Transform } from 'class-transformer';
import { CreateUserRequest } from 'src/protos/user.pb';

export class CreateUserRequestDto implements CreateUserRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  gender: Gender;

  @IsNotEmpty()
  @IsEnum(Role)
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  role: Role;
}
