import { FilterProductDto } from './../../ports/model/product';
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../ports/outboundPorts/IProductRepository';
import { Product, ProductDto } from '../../ports/model/product';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class ProductInMemory implements IProductRepository {
  private readonly products: Product[] = [];

  create(productDto: ProductDto): Promise<Product> {
    const product = new Product(productDto);
    this.products.push(product);
    return Promise.resolve(product);
  }

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  find(filterProductDto: FilterProductDto): Promise<Product[]> {
    const filteredProducts = this.products.filter((product) => {
      if (filterProductDto.id && product.id === filterProductDto.id)
        return true;
      if (
        filterProductDto.productName &&
        product.productName === filterProductDto.productName
      )
        return true;
      if (
        filterProductDto.unitValue !== undefined &&
        product.unitValue === filterProductDto.unitValue
      )
        return true;
      return false;
    });
    return Promise.resolve(filteredProducts);
  }

  async update(id: string, productDto: ProductDto): Promise<Product> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const updatedProduct = { ...this.products[productIndex], ...productDto };
    this.products[productIndex] = updatedProduct;
    return Promise.resolve(updatedProduct);
  }

  async remove(id: string): Promise<void> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(productIndex, 1);
    return Promise.resolve();
  }
}
