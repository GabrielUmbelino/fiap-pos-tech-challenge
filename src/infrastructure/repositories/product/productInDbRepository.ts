import { Injectable } from '@nestjs/common';
import { FilterProductDto, Product } from '../../../shared/models/product';
import { IRepository } from '../iRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './productEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductInDbRepository implements IRepository<Product> {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }

  create(product: Product): Promise<Product> {
    return this.repository
      .save({
        name: product.name,
        price: product.price,
        status: product.status,
        category: product.category,

        // TODO: implement following fields
        // descricao: produtoEntity.descricao,
        // imagemBase64: produtoEntity.imagemBase64,
      })
      .then((productEntity) => productEntity)
      .catch((error) => {
        throw new Error(
          `An error occurred while saving the product to the database: '${JSON.stringify(product)}': ${error.message}`,
        );
      });
  }

  find(filterProductDto: FilterProductDto): Promise<Product[]> {
    let whereClause = '';

    if (filterProductDto.categoryId) {
      whereClause = 'product.categoryId = :categoryId';
    }

    return this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where(whereClause, {
        categoryId: filterProductDto.categoryId,
      })
      .getMany()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the product in the database: ${error.message}`,
        );
      });
  }

  findById(id: Product['id']): Promise<Product> {
    return this.repository
      .createQueryBuilder('product')
      .where('product.id = :id', {
        id,
      })
      .getOne()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the product in the database: ${error.message}`,
        );
      });
  }

  async edit(): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  async delete(id: Product['id']): Promise<void> {
    throw new Error('Method not implemented.' + id);
  }
}
