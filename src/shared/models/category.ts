import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsOptional()
  id?: number;
  @IsNotEmpty()
  name?: string;
}

export class FilterCategoryDto {
  @IsOptional()
  id?: number;
  @IsNotEmpty()
  name?: string;
}

export class Category {
  id?: number;
  name: string;

  constructor(categoryDto: CategoryDto) {
    this.id = categoryDto?.id || randomInt(999);
    this.name = categoryDto.name;
  }
}
