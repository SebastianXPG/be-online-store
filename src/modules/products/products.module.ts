import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';
import { Product } from '../../entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPersiatences } from './persistences/products.persistences';
import { Category } from '../../entities/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  exports: [ProductsService, ProductPersiatences],
  providers: [ProductsService, ProductPersiatences],
  controllers: [ProductsController],
})
export class ProductsModule {}
