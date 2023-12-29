import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InvoiceDto } from '../dto/invoices-dto';
import { InvoicesService } from '../service/invoices.service';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('invoices')
@ApiTags('Invoices')
export class InvoicesController {
  constructor(private invioceService: InvoicesService) {}

  @Get()
  @ApiResponse({ type: InvoiceDto, isArray: true })
  async getAll(): Promise<InvoiceDto[]> {
    return await this.invioceService.getInvoices();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: InvoiceDto })
  async getOne(@Param('id') id: string): Promise<InvoiceDto> {
    return await this.invioceService.getInvoice(id);
  }

  @Post()
  @ApiBody({ type: InvoiceDto })
  @ApiResponse({ type: InvoiceDto })
  async create(@Body() invioceDto: InvoiceDto): Promise<InvoiceDto> {
    return await this.invioceService.create(invioceDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: InvoiceDto })
  @ApiResponse({ type: InvoiceDto })
  async update(
    @Param('id') id: string,
    @Body() invioceDto: InvoiceDto,
  ): Promise<InvoiceDto> {
    return await this.invioceService.update(id, invioceDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.invioceService.delete(id);
  }
}
