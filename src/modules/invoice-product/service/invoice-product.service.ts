import { Injectable } from '@nestjs/common';
import { InvoiceProductPersistences } from '../persistences/invoice-product.persistences';
import { InvoiceProductDto } from '../dto/invoice-products-dto';
import { InvoiceProduct } from 'src/entities/invoice-product.entity';
import {
  mapInvoiceProductDtoToEntity,
  mapInvoiceProductEntityToDto,
} from '../utils/invoice-products-utils';
import { randomUUID } from 'crypto';

@Injectable()
export class InvoiceProductService {
  constructor(private invoiceProductPersistences: InvoiceProductPersistences) {}

  async getProducts(): Promise<InvoiceProductDto[]> {
    const invoiceProductList: InvoiceProduct[] =
      await this.invoiceProductPersistences.findAll();
    if (invoiceProductList.length === 0) {
      return [];
    }
    const invoiceProductsDto: InvoiceProductDto[] = invoiceProductList.map(
      (invoiceProduct) => {
        return mapInvoiceProductEntityToDto(invoiceProduct);
      },
    );
    return invoiceProductsDto;
  }

  async getProduct(id: string): Promise<InvoiceProductDto> {
    const invoiceProduct: InvoiceProduct =
      await this.invoiceProductPersistences.findOne(id);
    if (invoiceProduct) {
      return mapInvoiceProductEntityToDto(invoiceProduct);
    }
    return null;
  }

  async create(
    invoiceProductDto: InvoiceProductDto,
  ): Promise<InvoiceProductDto> {
    const invoiceProductDtoFound: InvoiceProductDto = await this.getProduct(
      invoiceProductDto.id,
    );
    if (invoiceProductDtoFound) {
      return invoiceProductDtoFound;
    }
    const invoiceProductEntity: InvoiceProduct =
      mapInvoiceProductDtoToEntity(invoiceProductDto);
    invoiceProductEntity.idInvoiceProduct = randomUUID();
    const invoiceProductCreated: InvoiceProduct =
      await this.invoiceProductPersistences.create(invoiceProductEntity);
    if (invoiceProductCreated) {
      const invoiceProductDtoCreated: InvoiceProductDto =
        mapInvoiceProductEntityToDto(invoiceProductCreated);
      return invoiceProductDtoCreated;
    }
    return null;
  }

  async update(
    id: string,
    invoiceProductDto: InvoiceProductDto,
  ): Promise<InvoiceProductDto> {
    const invoiceProductDtoFound: InvoiceProductDto = await this.getProduct(id);
    if (!invoiceProductDtoFound) {
      return null;
    }
    const invoiceProductEntity: InvoiceProduct =
      mapInvoiceProductDtoToEntity(invoiceProductDto);
    await this.invoiceProductPersistences.update(id, invoiceProductEntity);
    const invoiceProductDtoUpdated: InvoiceProductDto =
      await this.getProduct(id);
    return invoiceProductDtoUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.invoiceProductPersistences.delete(id);
  }
}
