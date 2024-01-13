import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceProductModule } from './invoice-product/invoice-product.module';

@Module({
  imports: [UsersModule, CategoryModule, ProductsModule, InvoicesModule, InvoiceProductModule],
  exports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
