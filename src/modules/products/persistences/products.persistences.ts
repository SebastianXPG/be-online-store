import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/Category.entity';

@Injectable()
export class ProductPersiatences {
  private readonly logger = new Logger(ProductPersiatences.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findOne(idProduct: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: { idProduct: idProduct },
      relations: ['category'],
    });
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(id: string, product: Product): Promise<void> {
    await this.productRepository.update(id, product);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
