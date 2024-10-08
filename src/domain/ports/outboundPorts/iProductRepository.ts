import { Product } from '../model/product';

export interface IProductRepository {
  create(product: Product): Product;
  findAll(): Product[];
}

export const IProductRepository = Symbol('IProductRepository');
