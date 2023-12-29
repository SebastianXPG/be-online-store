import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../entities/Category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryPersiatences {
  private readonly logger = new Logger(CategoryPersiatences.name);

  constructor(
    @InjectRepository(Category)
    private readonly documentTypeRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.documentTypeRepository.find();
  }

  async findOne(idCategory: string): Promise<Category> {
    return await this.documentTypeRepository.findOne({
      where: { idCategory: idCategory },
    });
  }

  async create(category: Category): Promise<Category> {
    return await this.documentTypeRepository.save(category);
  }

  async update(id: string, category: Category): Promise<void> {
    await this.documentTypeRepository.update(id, category);
  }

  async delete(id: string): Promise<void> {
    await this.documentTypeRepository.delete(id);
  }
}
