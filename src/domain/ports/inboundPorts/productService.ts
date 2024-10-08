import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../model/product';
import { IProductService } from './iProductService';
import { IProductRepository} from '../outboundPorts/IProductRepository';

@Injectable()
export class ProductService implements IProductService {
  update(name: string, unit_value: number) {
    const product = new Product(name, unit_value);
      throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(IProductRepository) 
    private readonly productRepository: IProductRepository,
  ) {}

  create(name: string, unit_value: number): Product {
    const product = new Product(name, unit_value);

    this.productRepository.create(product);
    return product;
  }

  findAll(): Product[] {
    return this.productRepository.findAll();
  }
}
