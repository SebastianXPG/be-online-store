import { Injectable } from '@nestjs/common';
import { InvoicePersiatences } from '../persistences/invoices.persistences';
import { InvoiceDto } from '../dto/invoices-dto';
import { Invoice } from 'src/entities/invoice.entity';
import {
  mapInvoiceDtoToEntity,
  mapInvoiceEntityToDto,
} from '../utils/invoices-utils';
import { randomUUID } from 'crypto';

@Injectable()
export class InvoicesService {
  constructor(private invoicePersistences: InvoicePersiatences) {}

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
