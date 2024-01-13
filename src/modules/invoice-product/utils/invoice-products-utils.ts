import { Category } from 'src/entities/Category.entity';
import { InvoiceProduct } from 'src/entities/invoice-product.entity';
import { InvoceShortDto, InvoiceProductDto } from '../dto/invoice-products-dto';
import { Invoice } from 'src/entities/invoice.entity';
import { Product } from 'src/entities/product.entity';

export function mapInvoiceProductEntityToDto(
  entity: InvoiceProduct,
): InvoiceProductDto {
  const dto: InvoiceProductDto = new InvoiceProductDto();

  dto.id = entity.idInvoiceProduct;
  //mapeo de invoiceEntity para el nuevo dto que tenemos de invoice
  dto.invoice = entity.invoices;
  //mapeo de cada uno de los productEntity para el nuevo dto que tenemos de productos
  dto.products = entity.products;
  dto.countP = entity.countProduct;
  dto.price = entity.price;
  return dto;
}

export function mapInvoiceProductDtoToEntity(
  dto: InvoiceProductDto,
): InvoiceProduct {
  const entity: InvoiceProduct = new InvoiceProduct();
  entity.idInvoiceProduct = dto.id;
  entity.invoices = new Invoice();
  entity.invoices = dto.invoice.id_invoice;
  entity.products = [];
  entity.products.push(dto.products); // hay que ver como vienen y dependiendo de como vengan hacerle el mapeo a tipo Product de entidad
  entity.countProduct = dto.countP;
  entity.price = dto.price;

  return entity;
}

// export function mapInvoiceEntityToDto(
//   entity: Invoice,
// ): InvoceShortDto {
//   const dto: InvoceShortDto = new InvoceShortDto();
//   dto.id_invoice = entity.idInvoice;d
//   return dto;
// }
