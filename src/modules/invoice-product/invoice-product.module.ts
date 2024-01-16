import { Module } from '@nestjs/common';
import { InvoiceProductService } from './service/invoice-product.service';
import { InvoiceProductController } from './controller/invoice-product.controller';
import { InvoiceProductPersistences } from './persistences/invoice-product.persistences';
import { Product } from '../../entities/product.entity';
import { Invoice } from '../../entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceProduct } from '../../entities/invoice-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceProduct, Product, Invoice])],
  providers: [InvoiceProductService, InvoiceProductPersistences],
  controllers: [InvoiceProductController],
})
export class InvoiceProductModule {}
