import { Injectable } from '@nestjs/common';
import { FilterProductDto, Product } from '../../../shared/models/product';
import { IRepository } from '../iRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductInDbRepository implements IRepository<Product> {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

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

  findAll(): Promise<Product[]> {
    return this.repository
      .find({ relations: ['category'] })
      .then((produtoEntities) => {
        return produtoEntities.map((produtoEntity) => ({
          id: produtoEntity.id,
          name: produtoEntity.name,
          price: produtoEntity.price,
          status: produtoEntity.status,
          category: produtoEntity.category,

          // TODO: implement following fields
          // ativo: produtoEntity.ativo,
          // descricao: produtoEntity.descricao,
          // imagemBase64: produtoEntity.imagemBase64,
        }));
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the products in the database: ${error.message}`,
        );
      });
  }

  find(filterProductDto: FilterProductDto): Promise<Product[]> {
    return this.repository
      .createQueryBuilder('product')
      .where(
        'product.categoryId = :categoryId or  product.id in (:productIds) ',
        {
          categoryId: filterProductDto.categoryId,
          productIds: filterProductDto.ids?.length
            ? filterProductDto.ids.join(',')
            : null,
        },
      )
      .getMany()
      .then((produtoEntities) => {
        return produtoEntities.map((produtoEntity) => ({
          id: produtoEntity.id,
          name: produtoEntity.name,
          price: produtoEntity.price,
          status: produtoEntity.status,
          category: produtoEntity.category,

          // TODO: implement following fields
          // ativo: produtoEntity.ativo,
          // descricao: produtoEntity.descricao,
          // imagemBase64: produtoEntity.imagemBase64,
        }));
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the product in the database: '${JSON.stringify(filterProductDto)}': ${error.message}`,
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

  async edit(product: Product): Promise<Product> {
    console.log(product);
    throw new Error('Method not implemented.');
  }

  async delete(id: Product['id']): Promise<void> {
    throw new Error('Method not implemented.' + id);
  }
}
