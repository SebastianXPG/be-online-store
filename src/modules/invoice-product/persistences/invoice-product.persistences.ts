import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceProduct } from 'src/entities/invoice-product.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class InvoiceProductPersistences {
  private readonly logger = new Logger(InvoiceProductPersistences.name);

  constructor(
    @InjectRepository(InvoiceProduct)
    private readonly invoiceProductRepository: Repository<InvoiceProduct>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Invoice>,
  ) {}

  async findAll(): Promise<InvoiceProduct[]> {
    return await this.invoiceProductRepository.find({
      relations: ['Invoice', 'Product'],
    });
  }

  async findOne(idInvoiceProduct: string): Promise<InvoiceProduct> {
    return await this.invoiceProductRepository.findOne({
      where: { idInvoiceProduct: idInvoiceProduct },
      relations: ['Invoice', 'Product'],
    });
  }

  async create(invoiceProduct: InvoiceProduct): Promise<InvoiceProduct> {
    return await this.invoiceProductRepository.save(invoiceProduct);
  }

  async update(id: string, invoiceProduct: InvoiceProduct): Promise<void> {
    await this.invoiceProductRepository.update(id, invoiceProduct);
  }

  async delete(id: string): Promise<void> {
    await this.invoiceProductRepository.delete(id);
  }
}
