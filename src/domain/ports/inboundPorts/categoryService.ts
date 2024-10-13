import { Inject, Injectable } from '@nestjs/common';
import { Category, CategoryDto, FilterCategoryDto } from '../model/category';
import { ICategoryService } from './iCategoryService';
import { ICategoryRepository } from '../outboundPorts/iCategoryRepository';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  create(categoryDto: CategoryDto): Promise<Category> {
    return this.categoryRepository.create(categoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  find(filterCategoryDto: FilterCategoryDto): Promise<Category[]> {
    return this.categoryRepository.find(filterCategoryDto);
  }

  update(id: string, categoryDto: CategoryDto): Promise<Category> {
    return this.categoryRepository.update(id, categoryDto);
  }

  remove(id: string): Promise<void> {
    return this.categoryRepository.remove(id);
  }
}
