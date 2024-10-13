import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Category, FilterCategoryDto } from '../../../shared/models';
import { IService } from '../../iService';

@Injectable()
export class CategoryService implements IService<Category> {
  constructor(
    @Inject('IRepository<Category>')
    private readonly categoryRepository: IRepository<Category>,
  ) {}

  create(category: Category): Promise<Category> {
    return this.categoryRepository.create(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  find(filterCategoryDto: FilterCategoryDto): Promise<Category[]> {
    return this.categoryRepository.find(filterCategoryDto);
  }

  edit(category: Category): Promise<Category> {
    return this.categoryRepository.edit(category);
  }

  delete(id: number): Promise<void> {
    return this.categoryRepository.delete(id);
  }
}
