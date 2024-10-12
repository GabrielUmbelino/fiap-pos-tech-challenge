import { randomUUID } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  unitValue?: number;
}

export class FilterCategoryDto {
  @IsOptional()
  id?: string;
  @IsOptional()
  name?: string;
  @IsOptional()
  unitValue?: number;
}

export class Category {
  id: string;
  name: string;
  unitValue: number;

  constructor(categoryDto: CategoryDto) {
    this.id = categoryDto?.id || randomUUID();
    this.name = categoryDto.name;
    this.unitValue = categoryDto.unitValue;
  }
}
