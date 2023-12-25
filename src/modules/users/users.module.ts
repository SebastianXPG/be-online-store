import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserPersiatences } from './persistences/users.persistences';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserPersiatences],
  controllers: [UsersController],
})
export class UsersModule {}
