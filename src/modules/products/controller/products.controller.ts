import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ProductDto } from '../dto/products-dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Productos')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  @ApiResponse({ type: ProductDto, isArray: true })
  async getAll(): Promise<ProductDto[]> {
    return await this.productService.getProducts();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: ProductDto })
  async getOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.getProduct(id);
  }

  @Post()
  @ApiBody({ type: [ProductDto] }) // Especifica que esperas un array de ProductDto
  @ApiResponse({ type: ProductDto, isArray: true })
  async create(@Body() productsDto: ProductDto[]): Promise<ProductDto[]> {
    const createdProducts: ProductDto[] =
      await this.productService.create(productsDto);
    return createdProducts;
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ProductDto })
  @ApiResponse({ type: ProductDto })
  async update(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    return await this.productService.update(id, productDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.productService.delete(id);
  }
}
