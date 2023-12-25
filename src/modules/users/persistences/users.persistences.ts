import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserPersiatences {
  private readonly logger = new Logger(UserPersiatences.name);

  constructor(
    @InjectRepository(User)
    private readonly documentTypeRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.documentTypeRepository.find();
  }

  async findOne(idUser: string): Promise<User> {
    return await this.documentTypeRepository.findOne({
      where: { idUser: idUser },
    });
  }

  async create(user: User): Promise<User> {
    return await this.documentTypeRepository.save(user);
  }

  async update(id: string, user: User): Promise<void> {
    await this.documentTypeRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.documentTypeRepository.delete(id);
  }
}
