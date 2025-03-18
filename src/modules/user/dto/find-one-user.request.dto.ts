import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindOneRequestDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
