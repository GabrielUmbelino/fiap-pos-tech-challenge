import { Injectable } from '@nestjs/common';
import {
  Category,
  CategoryDto,
  FilterCategoryDto,
} from '../../../shared/models';
import { IRepository } from '../iRepository';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class CategoryInMemory implements IRepository<Category> {
  find(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  findById(): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  private readonly categories: Category[] = [];

  create(categoryDto: CategoryDto): Promise<Category> {
    const category = new Category(categoryDto);
    this.categories.push(category);
    return Promise.resolve(category);
  }

  findAll(): Promise<Category[]> {
    return Promise.resolve(this.categories);
  }

  async edit(categoryDto: CategoryDto): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === categoryDto.id,
    );
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    const updatedCategory = {
      ...this.categories[categoryIndex],
      ...categoryDto,
    };
    this.categories[categoryIndex] = updatedCategory;
    return Promise.resolve(updatedCategory);
  }

  async delete(id: number): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    );
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    this.categories.splice(categoryIndex, 1);
    return Promise.resolve();
  }
}
