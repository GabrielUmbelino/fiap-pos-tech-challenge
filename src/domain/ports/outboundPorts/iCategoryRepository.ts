import { Category, CategoryDto, FilterCategoryDto } from '../model/category';

export interface ICategoryRepository {
  update(id: string, categoryDto: CategoryDto): Promise<Category>;
  remove(id: string): Promise<void>;
  create(categoryDto: CategoryDto): Promise<Category>;
  findAll(): Promise<Category[]>;
  find(filterCategoryDto: FilterCategoryDto): Promise<Category[]>;
}

export const ICategoryRepository = Symbol('ICategoryRepository');
