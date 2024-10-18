import { Inject, Injectable } from '@nestjs/common';
import { FilterProductDto, Product } from '../../../shared/models';
import { IService } from '../../iService';
import { ProductInDbRepository } from '../../../infrastructure/repositories/product';

@Injectable()
export class ProductService implements IService<Product> {
  constructor(
    @Inject('IRepository<Product>')
    private readonly productRepository: ProductInDbRepository,
  ) {}
  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }

  create(productDto: Product): Promise<Product> {
    return this.productRepository.create(productDto);
  }

  find(filterProductDto: FilterProductDto): Promise<Product[]> {
    return this.productRepository.find(filterProductDto);
  }

  findById(id: Product['id']): Promise<Product> {
    return this.productRepository.findById(id);
  }

  edit(productDto: Product): Promise<Product> {
    return this.productRepository.edit(productDto);
  }

  delete(id: number): Promise<void> {
    return this.productRepository.delete(id);
  }
}
