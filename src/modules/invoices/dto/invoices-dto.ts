import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  idU: string;
  @ApiProperty()
  idP: string[];
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  priceTotal: number;
}

export class ProductLight {
  @ApiProperty()
  id_product: string;
  @ApiProperty()
  count_product: number;
  @ApiProperty()
  price: number;
}

export class InvoiceWithProductIdsDto {
  @ApiProperty()
  invoiceDto: InvoiceDto;
  @ApiProperty()
  productsLight: ProductLight[];
}
