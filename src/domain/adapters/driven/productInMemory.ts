import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../ports/outboundPorts/IProductRepository';
import { Product } from '../../ports/model/product';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class ProductInMemory implements IProductRepository {
  private readonly products: Product[] = [new Product('Coca-Cola', 7.50)];

  create(product: Product): Product {
    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }
}
