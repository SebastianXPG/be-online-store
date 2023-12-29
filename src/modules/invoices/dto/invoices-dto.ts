import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  idU: string;
  @ApiProperty()
  idP: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  priceTotal: number;
}
