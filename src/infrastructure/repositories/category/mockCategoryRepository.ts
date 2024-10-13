import { Category, CategoryDto } from '../../../shared/models';
import { IRepository } from '../iRepository';

export class MockCategoryRepository implements IRepository<Category> {
  private readonly categorys: Category[] = [];

  async create(categoryDto: CategoryDto): Promise<Category> {
    const createdCategory = new Category(categoryDto);
    this.categorys.push(createdCategory);
    return Promise.resolve(createdCategory);
  }

  async findAll(): Promise<Category[]> {
    return Promise.resolve(this.categorys);
  }

  async find(filterCategoryDto: CategoryDto): Promise<Category[]> {
    const filteredCategories = this.categorys.filter((category) => {
      if (filterCategoryDto.id && category.id === filterCategoryDto.id)
        return true;
      if (filterCategoryDto.name && category.name === filterCategoryDto.name)
        return true;
      return false;
    });

    return Promise.resolve(filteredCategories);
  }

  async edit(categoryDto: CategoryDto): Promise<Category> {
    const categoryIndex = this.categorys.findIndex(
      (category) => category.id === categoryDto.id,
    );
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    const updatedCategory = {
      ...this.categorys[categoryIndex],
      ...categoryDto,
    };
    this.categorys[categoryIndex] = updatedCategory;
    return Promise.resolve(updatedCategory);
  }

  async delete(id: number): Promise<void> {
    const categoryIndex = this.categorys.findIndex(
      (category) => category.id === id,
    );
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    this.categorys.splice(categoryIndex, 1);
    return Promise.resolve();
  }
}
