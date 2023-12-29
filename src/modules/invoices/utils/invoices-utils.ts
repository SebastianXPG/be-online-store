import { Invoice } from 'src/entities/invoice.entity';
import { InvoiceDto } from '../dto/invoices-dto';

export function mapInvoiceEntityToDto(entity: Invoice): InvoiceDto {
  const dto: InvoiceDto = new InvoiceDto();
  dto.id = entity.idInvoice;
  dto.idU = entity.idUser;
  dto.idP = entity.idProduct;
  dto.quantity = entity.quantity;
  dto.date = entity.date;
  dto.priceTotal = entity.totalPrice;

  return dto;
}

export function mapInvoiceDtoToEntity(dto: InvoiceDto): Invoice {
  const entity: Invoice = new Invoice();
  entity.idInvoice = dto.id;
  entity.idUser = dto.idU;
  entity.idProduct = dto.idP;
  entity.quantity = dto.quantity;
  entity.date = dto.date;
  entity.totalPrice = dto.priceTotal;

  return entity;
}
