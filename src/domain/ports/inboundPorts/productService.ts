import { Inject, Injectable } from '@nestjs/common';
import { Product, ProductDto, FilterProductDto } from '../model/product';
import { IProductService } from './iProductService';
import { IProductRepository } from '../outboundPorts/IProductRepository';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  create(productDto: ProductDto): Promise<Product> {
    return this.productRepository.create(productDto);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  find(filterProductDto: FilterProductDto): Promise<Product[]> {
    return this.productRepository.find(filterProductDto);
  }

  update(id: string, productDto: ProductDto): Promise<Product> {
    return this.productRepository.update(id, productDto);
  }

  remove(id: string): Promise<void> {
    return this.productRepository.remove(id);
  }
}
