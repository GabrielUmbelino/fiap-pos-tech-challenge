import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, FilterCategoryDto } from '../../../shared/models';
import { CategoryEntity } from './categoryEntity';
import { IRepository } from '../iRepository';

@Injectable()
export class CategoryInDbRepository implements IRepository<Category> {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  create(category: Category): Promise<Category> {
    return this.repository
      .save({
        name: category.name,
      })
      .then((categoryEntity) => {
        return new Category({
          id: categoryEntity.id,
          name: categoryEntity.name,
        });
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while saving the category to the database: '${JSON.stringify(category)}': ${error.message}`,
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

  find(categoryDto: FilterCategoryDto): Promise<Category[]> {
    return this.repository
      .createQueryBuilder('category')
      .where('category.id = :id', { id: categoryDto.id })
      .getMany()
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
          `An error occurred while searching the category in the database: '${JSON.stringify(categoryDto)}': ${error.message}`,
        );
      });
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  edit(): Promise<Category> {
    throw new Error('Method not implemented.');
  }
}
