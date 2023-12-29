import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryServices } from '../services/category.service';
import { CategoryDto } from '../dto/category-dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('categorias de los productos')
export class CategoryController {
  constructor(private categoryService: CategoryServices) {}

  @Get()
  @ApiResponse({ type: CategoryDto, isArray: true })
  async getAll(): Promise<CategoryDto[]> {
    return await this.categoryService.getCategory();
  }
  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: CategoryDto })
  async getOne(@Param('id') id: string): Promise<CategoryDto> {
    return await this.categoryService.getCategoryById(id);
  }

  @Post()
  @ApiBody({ type: CategoryDto })
  @ApiResponse({ type: CategoryDto })
  async create(@Body() categoryDto: CategoryDto): Promise<CategoryDto> {
    return await this.categoryService.create(categoryDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CategoryDto })
  @ApiResponse({ type: CategoryDto })
  async update(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.update(id, categoryDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.categoryService.delete(id);
  }
}
