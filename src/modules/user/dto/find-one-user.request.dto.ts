import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FindOneRequest } from 'src/protos/user.pb';

export class FindOneRequestDto implements FindOneRequest {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
