import { Module } from '@nestjs/common';
import { InvoiceProductService } from './service/invoice-product.service';
import { InvoiceProductController } from './controller/invoice-product.controller';
import { InvoiceProductPersistences } from './persistences/invoice-product.persistences';
import { Product } from 'src/entities/product.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Invoice])],
  providers: [InvoiceProductService, InvoiceProductPersistences],
  controllers: [InvoiceProductController],
})
export class InvoiceProductModule {}
