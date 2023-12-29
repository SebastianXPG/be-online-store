import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [UsersModule, CategoryModule, ProductsModule, InvoicesModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
