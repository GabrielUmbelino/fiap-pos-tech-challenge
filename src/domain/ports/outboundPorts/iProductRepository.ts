import { Product, ProductDto, FilterProductDto } from '../model/product';

export interface IProductRepository {
  update(id: string, productDto: ProductDto): Promise<Product>;
  remove(id: string): Promise<void>;
  create(productDto: ProductDto): Promise<Product>;
  findAll(): Promise<Product[]>;
  find(filterProductDto: FilterProductDto): Promise<Product[]>;
}

export const IProductRepository = Symbol('IProductRepository');
