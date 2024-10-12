import { FilterCategoryDto } from './../model/category';
import { Category, CategoryDto } from '../model/category';

/**
 * Our domain input port
 */

export interface ICategoryService {
  create(categoryDto: CategoryDto): Promise<Category>;
  findAll(): Promise<Category[]>;
  find(filterCategoryDto: FilterCategoryDto): Promise<Category[]>;
  update(id: string, categoryDto: CategoryDto): Promise<Category>;
  remove(id: string): Promise<void>;
}
