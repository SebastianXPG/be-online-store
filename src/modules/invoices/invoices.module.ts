import { Module } from '@nestjs/common';
import { InvoicesController } from './controller/invoices.controller';
import { InvoicesService } from './service/invoices.service';
import { Invoice } from 'src/entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicePersiatences } from './persistences/invoices.persistences';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, Product, User]),
    ProductsModule,
    //InvoinceProductModule
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicePersiatences],
})
export class InvoicesModule {}
