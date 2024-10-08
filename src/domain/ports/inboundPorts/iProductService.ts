import { Product } from '../model/product';


export interface IProductService {
  create(name: string, unit_value: number): Product;
  findAll(): Product[];
}
