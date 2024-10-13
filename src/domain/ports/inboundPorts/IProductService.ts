import { FilterProductDto } from './../model/product';
import { Product, ProductDto } from '../model/product';

/**
 * Our domain input port
 */

export interface IProductService {
  create(productDto: ProductDto): Promise<Product>;
  findAll(): Promise<Product[]>;
  find(filterProductDto: FilterProductDto): Promise<Product[]>;
  update(id: string, productDto: ProductDto): Promise<Product>;
  remove(id: string): Promise<void>;
}
