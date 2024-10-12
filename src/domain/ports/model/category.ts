import { randomUUID } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  categoryName?: string;
}

export class FilterCategoryDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  categoryName?: string;
}

export class Category {
  id: string;
  categoryName: string;

  constructor(categoryDto: CategoryDto) {
    this.id = categoryDto?.id || randomUUID();
    this.categoryName = categoryDto.categoryName;
  }
}
