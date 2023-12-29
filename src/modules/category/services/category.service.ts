import { Injectable } from '@nestjs/common';
import { CategoryPersiatences } from '../persistences/category.persistences';
import { CategoryDto } from '../dto/category-dto';
import { Category } from 'src/entities/Category.entity';
import { randomUUID } from 'crypto';
import {
  mapCategoryDtoToEntity,
  mapCategoryEntityToDto,
} from '../utils/category-utils';

@Injectable()
export class CategoryServices {
  constructor(private categoryPersistences: CategoryPersiatences) {}

  async getCategory(): Promise<CategoryDto[]> {
    const categories: Category[] = await this.categoryPersistences.findAll();
    if (categories.length === 0) {
      return [];
    }
    const categoriesDtoList: CategoryDto[] = categories.map((category) => {
      return mapCategoryEntityToDto(category);
    });
    return categoriesDtoList;
  }

  async getCategoryById(id: string): Promise<CategoryDto> {
    const category: Category = await this.categoryPersistences.findOne(id);
    if (category) {
      return mapCategoryEntityToDto(category);
    }
    return null;
  }

  async create(categoryDto: CategoryDto): Promise<CategoryDto> {
    const categoryDtoFound: CategoryDto = await this.getCategoryById(
      categoryDto.id,
    );
    if (categoryDtoFound) {
      return categoryDtoFound;
    }
    const categoryEntity: Category = mapCategoryDtoToEntity(categoryDto);
    categoryEntity.idCategory = randomUUID();
    const categoryCreated: Category =
      await this.categoryPersistences.create(categoryEntity);
    if (categoryCreated) {
      const categoryDtoCreated: CategoryDto =
        mapCategoryEntityToDto(categoryCreated);
      return categoryDtoCreated;
    }
    return null;
  }

  async update(id: string, categoryDto: CategoryDto): Promise<CategoryDto> {
    const categoryDtoFound: CategoryDto = await this.getCategoryById(id);
    if (!categoryDtoFound) {
      return null;
    }
    const categoryEntity: Category = mapCategoryDtoToEntity(categoryDto);
    await this.categoryPersistences.update(id, categoryEntity);
    const categoryDtoUpdated: CategoryDto = await this.getCategoryById(id);
    return categoryDtoUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.categoryPersistences.delete(id);
  }
}
