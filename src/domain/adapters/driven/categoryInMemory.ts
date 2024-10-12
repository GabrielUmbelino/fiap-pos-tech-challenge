import { FilterCategoryDto } from './../../ports/model/category';
import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../ports/outboundPorts/iCategoryRepository';
import { Category, CategoryDto } from '../../ports/model/category';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class CategoryInMemory implements ICategoryRepository {
  private readonly categories: Category[] = [];

  create(categoryDto: CategoryDto): Promise<Category> {
    const category = new Category(categoryDto);
    this.categories.push(category);
    return Promise.resolve(category);
  }

  findAll(): Promise<Category[]> {
    return Promise.resolve(this.categories);
  }

  find(filterCategoryDto: FilterCategoryDto): Promise<Category[]> {
    const filteredCategories = this.categories.filter((category) => {
      if (filterCategoryDto.id && category.id === filterCategoryDto.id)
        return true;
      if (
        filterCategoryDto.categoryName &&
        category.categoryName === filterCategoryDto.categoryName
      )
        return true;
      return false;
    });
    return Promise.resolve(filteredCategories);
  }

  async update(id: string, categoryDto: CategoryDto): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
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

  async remove(id: string): Promise<void> {
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
