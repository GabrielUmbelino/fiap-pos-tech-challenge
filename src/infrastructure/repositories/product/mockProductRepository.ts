import { Product, ProductDto } from '../../../shared/models';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

export class MockProductRepository implements IRepository<Product> {
  edit(): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly products: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return Promise.resolve(product);
  }

  async findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  async find(filterProductDto: ProductDto): Promise<Product[]> {
    const filteredProducts = this.products.filter((product) => {
      if (filterProductDto.id && product.id === filterProductDto.id)
        return true;
      if (filterProductDto.name && product.name === filterProductDto.name)
        return true;
      if (
        filterProductDto.price !== undefined &&
        product.price === filterProductDto.price
      )
        return true;
      return false;
    });

    return Promise.resolve(filteredProducts);
  }

  async update(productDto: Product): Promise<Product> {
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

  async remove(id: number): Promise<void> {
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
