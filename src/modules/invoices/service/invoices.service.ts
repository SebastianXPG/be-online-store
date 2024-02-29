import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoicePersiatences } from '../persistences/invoices.persistences';
import {
  InvoiceDto,
  InvoiceWithProductIdsDto,
  // ProductLight,
} from '../dto/invoices-dto';
import { Invoice } from 'src/entities/invoice.entity';
import {
  mapInvoiceDtoToEntity,
  mapInvoiceEntityToDto,
} from '../utils/invoices-utils';
import { randomUUID } from 'crypto';
import { Product } from 'src/entities/product.entity';
import { ProductsService } from 'src/modules/products/service/products.service';
// import { InvoiceProduct } from 'src/entities/invoice-product.entity';

@Injectable()
export class InvoicesService {
  constructor(
    private invoicePersistences: InvoicePersiatences,
    private productService: ProductsService,
    // private invoiceProductService: InvoiceProductService
  ) {}

  async getInvoices(): Promise<InvoiceDto[]> {
    const invoices: Invoice[] = await this.invoicePersistences.findAll();
    if (invoices.length === 0) {
      return [];
    }
    const invoicesDtoList: InvoiceDto[] = invoices.map((invoice) => {
      return mapInvoiceEntityToDto(invoice);
    });
    return invoicesDtoList;
  }

  async getInvoice(id: string): Promise<InvoiceDto> {
    const invoice: Invoice = await this.invoicePersistences.findOne(id);
    if (invoice) {
      return mapInvoiceEntityToDto(invoice);
    }
    return null;
  }

  async create(invoiceDto: InvoiceDto): Promise<InvoiceDto> {
    const invoiceDtoFound: InvoiceDto = await this.getInvoice(invoiceDto.id);
    if (invoiceDtoFound) {
      return invoiceDtoFound;
    }
    const invoiceEntity: Invoice = mapInvoiceDtoToEntity(invoiceDto);
    invoiceEntity.idInvoice = randomUUID();
    const invoiceCreated: Invoice =
      await this.invoicePersistences.create(invoiceEntity);
    if (invoiceCreated) {
      const invoiceDtoCreated: InvoiceDto =
        mapInvoiceEntityToDto(invoiceCreated);
      return invoiceDtoCreated;
    }
    return null;
  }

  async createInvoiceWithProduct2(
    invoiceWithProductIdsDto: InvoiceWithProductIdsDto,
  ): Promise<InvoiceDto> {
    const invoiceEntity: Invoice = mapInvoiceDtoToEntity(
      invoiceWithProductIdsDto.invoiceDto,
    );
    const productIds: string[] = invoiceWithProductIdsDto.productsLight.map(
      (product) => {
        return product.id_product;
      },
    );
    const products: Product[] =
      await this.productService.findProductsById(productIds);
    if (products.length !== productIds.length) {
      throw new NotFoundException('Uno o mas productos no fueron encontrados');
    }

    invoiceEntity.products = products;
    const savedInvoice = await this.invoicePersistences.create(invoiceEntity);
    return mapInvoiceEntityToDto(savedInvoice);
  }
  //TODO
  // async createInvoiceWithProduct(
  //   invoiceWithProductIdsDto: InvoiceWithProductIdsDto,
  // ): Promise<InvoiceDto> {
  //   //1  .Obtenemos la factura
  //   const invoiceEntity: Invoice = mapInvoiceDtoToEntity(
  //     invoiceWithProductIdsDto.invoiceDto,
  //   );
  //   //Crear la factura
  //   invoiceEntity.idInvoice = randomUUID();
  //   const invoiceEntityCreated =
  //     await this.invoicePersistences.create(invoiceEntity);
  //   if (!invoiceEntityCreated) {
  //     throw new NotFoundException('Factura no creada');
  //   }
  //   const productsLight: ProductLight[] =
  //     invoiceWithProductIdsDto.productsLight; //Productos livianos
  //   const idInvoice: string = invoiceEntityCreated.idInvoice; //Id de la factura

  //   const productIds: string[] = invoiceWithProductIdsDto.productsLight.map(
  //     (product) => {
  //       return product.id_product;
  //     },
  //   ); //Opcional
  //   const products: Product[] =
  //     await this.productService.findProductsById(productIds); // OPCIONAL
  //   if (products.length !== productIds.length) {
  //     throw new NotFoundException('Uno o mas productos no fueron encontrados');
  //   }
  //   // Descomentar cuando tenga la entidad de InvoiceProduct hecha
  //   const invoiceProduct: InvoiceProduct[] = productsLight.map(
  //     (productLight) => {
  //       return {
  //         idInvoiceProduct: '',
  //         idInvoice: idInvoice,
  //         idProduct: productLight.id_product,
  //         countProduct: productLight.count_product,
  //         price: productLight.price,
  //       };
  //     },
  //   );

  //   // crear e invocar el InvoiceProductService con el metodo que permite crear multiples InvoiceProducts
  //   // Ejemplo
  //   // Va a enviar invoiceProduct: InvoiceProduct[]
  //   await this.invoiceProductService.createInvoiceProduct(invoiceProduct);
  //   invoiceEntity.products = products;
  //   const savedInvoice = await this.invoicePersistences.create(invoiceEntity);
  //   return mapInvoiceEntityToDto(savedInvoice);
  // }

  async update(id: string, invoiceDto: InvoiceDto): Promise<InvoiceDto> {
    const invoiceDtoFound: InvoiceDto = await this.getInvoice(id);
    if (!invoiceDtoFound) {
      return null;
    }
    const invoiceEntity: Invoice = mapInvoiceDtoToEntity(invoiceDto);
    await this.invoicePersistences.update(id, invoiceEntity);
    const invoiceDtoUpdated: InvoiceDto = await this.getInvoice(id);
    return invoiceDtoUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.invoicePersistences.delete(id);
  }
}
