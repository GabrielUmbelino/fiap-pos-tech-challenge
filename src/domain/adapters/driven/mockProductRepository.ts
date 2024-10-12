import { Product, ProductDto } from '../../ports/model/product';
import { IProductRepository } from '../../ports/outboundPorts/IProductRepository';

export class MockProductRepository implements IProductRepository {
  private readonly products: Product[] = [];

  async create(productDto: ProductDto): Promise<Product> {
    const createdProduct = new Product(productDto);
    this.products.push(createdProduct);
    return Promise.resolve(createdProduct);
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
