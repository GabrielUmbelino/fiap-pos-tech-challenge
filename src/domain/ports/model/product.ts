import { randomUUID } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from './category';

export class ProductDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  productName?: string;
  @IsNotEmpty()
  unitValue?: number;
  @IsOptional()
  productCategory?: Category;
}

export class FilterProductDto {
  @IsOptional()
  id?: string;
  @IsOptional()
  productName?: string;
  @IsOptional()
  unitValue?: number;
  @IsOptional()
  productCategory?: Category;
}

export class Product {
  id: string;
  productName: string;
  unitValue: number;
  productCategory: Category;

  constructor(productDto: ProductDto) {
    this.id = productDto?.id || randomUUID();
    this.productName = productDto.productName;
    this.unitValue = productDto.unitValue;
    this.productCategory = productDto.productCategory;
  }
}
