import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InvoiceProductService } from '../service/invoice-product.service';
import { InvoiceProductDto } from '../dto/invoice-products-dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('invoice-products')
@ApiTags('Invoice Products')
export class InvoiceProductController {
  constructor(private invoiceProductService: InvoiceProductService) {}

  @Get()
  @ApiResponse({ type: InvoiceProductDto, isArray: true })
  async getAll(): Promise<InvoiceProductDto[]> {
    return await this.invoiceProductService.getProducts();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: InvoiceProductDto })
  async getOne(@Param('id') id: string): Promise<InvoiceProductDto> {
    return await this.invoiceProductService.getProduct(id);
  }

  @Post()
  @ApiBody({ type: InvoiceProductDto })
  @ApiResponse({ type: InvoiceProductDto })
  async create(
    @Body() invoiceProductDto: InvoiceProductDto,
  ): Promise<InvoiceProductDto> {
    return await this.invoiceProductService.create(invoiceProductDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: InvoiceProductDto })
  @ApiResponse({ type: InvoiceProductDto })
  async update(
    @Param('id') id: string,
    @Body() invoiceProductDto: InvoiceProductDto,
  ): Promise<InvoiceProductDto> {
    return await this.invoiceProductService.update(id, invoiceProductDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.invoiceProductService.delete(id);
  }
}
