import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from './category';

export class ProductDto {
  @IsOptional()
  id: number;
  @IsNotEmpty()
  productName?: string;
  @IsNotEmpty()
  price?: number;
}

export class FilterProductDto {
  @IsOptional()
  id?: number;
  @IsOptional()
  productName?: string;
  @IsOptional()
  price?: number;
}

export class Product {
  id?: number;
  name: string;
  price: number;

  constructor(productDto: ProductDto) {
    this.id = productDto?.id || randomInt(999);
    this.name = productDto.name;
    this.price = productDto.price;
  }
}
