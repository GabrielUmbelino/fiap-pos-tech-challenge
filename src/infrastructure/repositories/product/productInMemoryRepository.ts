import { Injectable } from '@nestjs/common';
import { FilterProductDto, Product } from '../../../shared/models/product';
import { IRepository } from '../iRepository';

@Injectable()
export class ProductInMemoryRepository implements IRepository<Product> {
  private readonly products: Product[] = [];

  create(product: Product): Promise<Product> {
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
      if (filterProductDto.name && product.name === filterProductDto.name)
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

  async edit(productDto: Product): Promise<Product> {
    const productIndex = this.products.findIndex(
      (product) => product.id === productDto.id,
    );
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const updatedProduct = { ...this.products[productIndex], ...productDto };
    this.products[productIndex] = updatedProduct;
    return Promise.resolve(updatedProduct);
  }

  async delete(id: number): Promise<void> {
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
