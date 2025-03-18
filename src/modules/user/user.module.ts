import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../entities/user.entity';
import { UsersRepository } from './repositories/base/user.repo';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, UsersRepository],
  controllers: [UserController],
})
export class UserModule {}
