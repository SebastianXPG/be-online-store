import { Module } from '@nestjs/common';
import { InvoicesController } from './controller/invoices.controller';
import { InvoicesService } from './service/invoices.service';
import { Invoice } from 'src/entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicePersiatences } from './persistences/invoices.persistences';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicePersiatences],
})
export class InvoicesModule {}
