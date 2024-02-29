import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  code: number;
  @ApiProperty()
  count: number;
  @ApiProperty()
  img: string;

  // Agrega un constructor para inicializar las propiedades si es necesario
  constructor(data: Partial<ProductDto>) {
    Object.assign(this, data);
  }
}
