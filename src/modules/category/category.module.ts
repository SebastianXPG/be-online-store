import { Module } from '@nestjs/common';
import { CategoryServices } from './services/category.service';
import { CategoryController } from './controller/category.controller';
import { Category } from 'src/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryPersiatences } from './persistences/category.persistences';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryServices, CategoryPersiatences],
  controllers: [CategoryController],
})
export class CategoryModule {}
