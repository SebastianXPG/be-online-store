import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductPersiatences {
  private readonly logger = new Logger(ProductPersiatences.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findProductsById(productIds: string[]): Promise<Product[]> {
    return await this.productRepository.find({
      where: { idProduct: In(productIds) },
      relations: ['category'],
    });
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
