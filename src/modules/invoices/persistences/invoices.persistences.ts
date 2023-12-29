import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicePersiatences {
  private readonly logger = new Logger(InvoicePersiatences.name);

  constructor(
    @InjectRepository(Invoice)
    private readonly documentTypeRepository: Repository<Invoice>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return await this.documentTypeRepository.find();
  }

  async findOne(idInvoice: string): Promise<Invoice> {
    return await this.documentTypeRepository.findOne({
      where: { idInvoice: idInvoice },
    });
  }

  async create(user: Invoice): Promise<Invoice> {
    return await this.documentTypeRepository.save(user);
  }

  async update(id: string, user: Invoice): Promise<void> {
    await this.documentTypeRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.documentTypeRepository.delete(id);
  }
}
