import { Product } from 'src/entities/product.entity';
import { ProductDto } from '../dto/products-dto';
import { Category } from 'src/entities/Category.entity';

export function mapProductEntityToDto(entity: Product): ProductDto {
  const dto: ProductDto = new ProductDto();
  dto.id = entity.idProduct;
  dto.name = entity.name;
  dto.price = entity.price;
  dto.categoryId = entity.category.idCategory;
  dto.description = entity.description;
  dto.code = entity.productCode;
  dto.category = entity.category.name;
  dto.count = entity.count;
  dto.img = entity.img;

  return dto;
}

export function mapProductDtoToEntity(dto: ProductDto): Product {
  const entity: Product = new Product();
  entity.idProduct = dto.id;
  entity.name = dto.name;
  entity.price = dto.price;
  entity.count = dto.count;
  entity.description = dto.description;
  entity.productCode = dto.code;
  entity.img = dto.img;

  entity.category = new Category();
  entity.category.idCategory = dto.categoryId;

  return entity;
}
