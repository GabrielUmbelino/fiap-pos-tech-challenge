import { Category, CategoryDto } from '../../ports/model/category';
import { ICategoryRepository } from '../../ports/outboundPorts/iCategoryRepository';

export class MockCategoryRepository implements ICategoryRepository {
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
    const categoryIndex = this.categorys.findIndex(
      (category) => category.id === id,
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

  async remove(id: string): Promise<void> {
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
