import { Injectable } from '@nestjs/common';
import { UserPersiatences } from '../persistences/users.persistences';
import { UserDto } from '../dto/users-dto';
import { mapUserDtoToEntity, mapUserEntityToDto } from '../utils/users-utils';
import { User } from '../../../entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private userPersistences: UserPersiatences) {}

  async getUsers(): Promise<UserDto[]> {
    const users: User[] = await this.userPersistences.findAll();
    if (users.length === 0) {
      return [];
    }
    const usersDtoList: UserDto[] = users.map((user) => {
      return mapUserEntityToDto(user);
    });
    return usersDtoList;
  }

  async getUser(id: string): Promise<UserDto> {
    const user: User = await this.userPersistences.findOne(id);
    if (user) {
      return mapUserEntityToDto(user);
    }
    return null;
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const userDtoFound: UserDto = await this.getUser(userDto.id);
    if (userDtoFound) {
      return userDtoFound;
    }
    const userEntity: User = mapUserDtoToEntity(userDto);
    userEntity.idUser = randomUUID();
    const userCreated: User = await this.userPersistences.create(userEntity);
    if (userCreated) {
      const userDtoCreated: UserDto = mapUserEntityToDto(userCreated);
      return userDtoCreated;
    }
    return null;
  }

  async update(id: string, userDto: UserDto): Promise<UserDto> {
    const userDtoFound: UserDto = await this.getUser(id);
    if (!userDtoFound) {
      return null;
    }
    const userEntity: User = mapUserDtoToEntity(userDto);
    await this.userPersistences.update(id, userEntity);
    const userDtoUpdated: UserDto = await this.getUser(id);
    return userDtoUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.userPersistences.delete(id);
  }
}
