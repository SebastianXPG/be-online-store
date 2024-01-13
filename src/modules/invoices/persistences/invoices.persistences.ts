import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entities/invoice.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicePersiatences {
  private readonly logger = new Logger(InvoicePersiatences.name);

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Invoice>,
    @InjectRepository(User)
    private readonly userRepository: Repository<Invoice>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepository.find({
      relations: ['products', 'user'],
    });
  }

  async findOne(idInvoice: string): Promise<Invoice> {
    return await this.invoiceRepository.findOne({
      where: { idInvoice: idInvoice },
      relations: ['products', 'user'],
    });
  }

  async create(user: Invoice): Promise<Invoice> {
    return await this.invoiceRepository.save(user);
  }

  async update(id: string, user: Invoice): Promise<void> {
    await this.invoiceRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.invoiceRepository.delete(id);
  }
}
