import { Invoice } from 'src/entities/invoice.entity';
import { InvoiceDto } from '../dto/invoices-dto';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';

export function mapInvoiceEntityToDto(entity: Invoice): InvoiceDto {
  const dto: InvoiceDto = new InvoiceDto();
  //console.log('mapInvoiceEntityToDto = > entity: ', entity);
  dto.id = entity.idInvoice;
  dto.idU = entity.user.idUser;
  const products: Product[] = entity.products;
  console.log('mapInvoiceEntityToDto = > products: ', products);
  if (products && products.length > 1) {
    dto.idP = products.map((product) => product.idProduct);
  } else if (products && products.length === 1) {
    dto.idP = [products[0].idProduct];
  } else {
    const id = entity.products[0].idProduct;
    dto.idP = [id];
  }
  dto.quantity = entity.quantity;
  dto.date = entity.date;
  dto.priceTotal = entity.totalPrice;

  return dto;
}

export function mapInvoiceDtoToEntity(dto: InvoiceDto): Invoice {
  console.log('mapInvoiceDtoToEntity = dto: ', dto);
  const entity: Invoice = new Invoice();
  entity.idInvoice = dto.id;
  entity.user = new User();
  entity.user.idUser = dto.idU;
  const productsIds = dto.idP.map((id) => {
    const product = new Product();
    product.idProduct = id;
    return product;
  });
  entity.products = productsIds;
  entity.quantity = dto.quantity;
  entity.date = dto.date;
  entity.totalPrice = dto.priceTotal;

  return entity;
}
