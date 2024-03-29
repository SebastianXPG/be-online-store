import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductPersiatences } from '../persistences/products.persistences';
import { ProductDto } from '../dto/products-dto';
import { Product } from 'src/entities/product.entity';
import {
  mapProductDtoToEntity,
  mapProductEntityToDto,
} from '../utils/products-utils';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(private productPersistences: ProductPersiatences) {}

  async getProducts(): Promise<ProductDto[]> {
    const products: Product[] = await this.productPersistences.findAll();
    if (products.length === 0) {
      return [];
    }
    const productsDtoList: ProductDto[] = products.map((product) => {
      return mapProductEntityToDto(product);
    });
    return productsDtoList;
  }

  async getProduct(id: string): Promise<ProductDto> {
    const product: Product = await this.productPersistences.findOne(id);
    if (product) {
      return mapProductEntityToDto(product);
    }
    return null;
  }

  async findProductsById(productIds: string[]): Promise<Product[]> {
    const products: Product[] =
      await this.productPersistences.findProductsById(productIds);
    if (products.length !== productIds.length) {
      const foundProductsId = products.map((product) => product.idProduct);
      const notFoundProductsId = productIds.filter(
        (id) => !foundProductsId.includes(id),
      );
      throw new NotFoundException(
        'Productos con id: [' +
          notFoundProductsId.join(', ') +
          '] no encontrados',
      );
    }
    return products;
  }

  async create(productsDtoList: ProductDto[]): Promise<ProductDto[]> {
    const createdProducts: ProductDto[] = [];

    for (const productDto of productsDtoList) {
      const productDtoFound: ProductDto = await this.getProduct(productDto.id);

      if (!productDtoFound) {
        const productEntity: Product = mapProductDtoToEntity(productDto);
        productEntity.idProduct = randomUUID();
        const productCreated: Product =
          await this.productPersistences.create(productEntity);

        if (productCreated) {
          const productDtoCreated: ProductDto =
            mapProductEntityToDto(productCreated);
          createdProducts.push(productDtoCreated);
        }
      } else {
        // Si el producto ya existe, podrías manejarlo de alguna manera, por ejemplo, ignorarlo o actualizarlo
        // Aquí lo estoy ignorando y continuando con los demás productos
        console.warn(`Producto con ID ${productDto.id} ya existe. Ignorado.`);
      }
    }

    return createdProducts;
  }

  async update(id: string, productDto: ProductDto): Promise<ProductDto> {
    const productDtoFound: ProductDto = await this.getProduct(id);
    if (!productDtoFound) {
      return null;
    }
    const productEntity: Product = mapProductDtoToEntity(productDto);
    await this.productPersistences.update(id, productEntity);
    const productDtoUpdated: ProductDto = await this.getProduct(id);
    return productDtoUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.productPersistences.delete(id);
  }
}
