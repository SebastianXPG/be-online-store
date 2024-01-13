import { ApiProperty } from '@nestjs/swagger';
export class InvoceShortDto {
  @ApiProperty()
  id_invoice: string;

}

export class ProductShortDto {
  @ApiProperty()
  id_product: string;
}

export class InvoiceProductDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  //invoice: InvoceShortDto;
  invoice: any;
  @ApiProperty()
  // products: ProductShortDto[];
  products: any;
  @ApiProperty()
  countP: number;
  @ApiProperty()
  price: number;
}
