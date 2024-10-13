import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { FilterProductDto, Product } from '../../../shared/models';
import { IService } from '../../iService';

@Injectable()
export class ProductService implements IService<Product> {
  constructor(
    @Inject('IRepository<Product>')
    private readonly productRepository: IRepository<Product>,
  ) {}

  create(productDto: Product): Promise<Product> {
    return this.productRepository.create(productDto);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  find(filterProductDto: FilterProductDto): Promise<Product[]> {
    return this.productRepository.find(filterProductDto);
  }

  edit(productDto: Product): Promise<Product> {
    return this.productRepository.edit(productDto);
  }

  delete(id: number): Promise<void> {
    return this.productRepository.delete(id);
  }
}
