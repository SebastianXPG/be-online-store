import { Category } from 'src/entities/category.entity';
import { CategoryDto } from '../dto/category-dto';

export function mapCategoryEntityToDto(entity: Category): CategoryDto {
  const dto: CategoryDto = new CategoryDto();
  dto.id = entity.idCategory;
  dto.name = entity.name;
  dto.code = entity.categoryCode;

  return dto;
}

export function mapCategoryDtoToEntity(dto: CategoryDto): Category {
  const entity: Category = new Category();
  entity.idCategory = dto.id;
  entity.name = dto.name;
  entity.categoryCode = dto.code;

  return entity;
}
