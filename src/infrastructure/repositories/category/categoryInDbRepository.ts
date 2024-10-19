import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../shared/models';
import { CategoryEntity } from './categoryEntity';
import { IRepository } from '../iRepository';

@Injectable()
export class CategoryInDbRepository implements IRepository<Category> {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  findById(id: number): Promise<Category> {
    return this.repository
      .createQueryBuilder('category')
      .where('category.id = :id', { id: id })
      .getOne()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the category in the database: '${JSON.stringify(id)}': ${error.message}`,
        );
      });
  }

  create(category: Category): Promise<Category> {
    return this.repository.save(category).catch((error) => {
      throw new Error(
        `An error occurred while creating the category to the database: '${JSON.stringify(category)}': ${error.message}`,
      );
    });
  }

  findAll(): Promise<Category[]> {
    return this.repository
      .find()
      .then((categoryEntities) => {
        return categoryEntities.map(
          (categoryEntity) =>
            new Category({
              id: categoryEntity.id,
              name: categoryEntity.name,
            }),
        );
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the category in the database: ${error.message}`,
        );
      });
  }

  find(id: number): Promise<Category[]> {
    return this.repository
      .createQueryBuilder('category')
      .where('category.id = :id', { id: id })
      .getMany()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the category in the database: '${JSON.stringify(id)}': ${error.message}`,
        );
      });
  }

  async delete(categoryId): Promise<void> {
    await this.repository.delete(categoryId);
  }

  edit(category): Promise<Category> {
    return this.repository
      .update(category.id, category)
      .then(() => category)
      .catch((error) => {
        throw new Error(
          `An error occurred while editing the category to the database: '${JSON.stringify(category)}': ${error.message}`,
        );
      });
  }
}
