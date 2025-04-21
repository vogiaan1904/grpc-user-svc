import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateUserRequest } from '../../../protos/user.pb';

export class UpdateUserProfileDto implements UpdateUserRequest {
  constructor(partial: Partial<UpdateUserProfileDto>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
