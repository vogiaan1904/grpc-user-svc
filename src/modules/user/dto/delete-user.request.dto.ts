import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
