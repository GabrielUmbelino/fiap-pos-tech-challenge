import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ApiQuery } from '@nestjs/swagger';
import {
  FilterProductDto,
  Product,
  ProductDto,
} from '../shared/models/product';
import { IService } from '../domain/iService';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(
    @Inject('IService<Product>') private productService: IService<Product>,
  ) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @ApiQuery({
    name: 'id',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'unitValue',
    type: Number,
    required: false,
  })
  @Get(':params')
  find(
    @Query('id') id?: number,
    @Query('name') name?: string,
    @Query('unitValue') unitValue?: number,
  ): Promise<Product[]> {
    const filterProductDto: FilterProductDto = {
      id,
      name,
      unitValue,
    };

    return this.productService.find(filterProductDto);
  }

  @Post()
  async create(@Body() productDto: ProductDto): Promise<Product> {
    const product = await this.productService.create(productDto as Product);
    this.logger.debug(productDto);
    this.logger.debug({ product });
    return product;
  }

  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productService.edit({
      ...productDto,
      id,
    } as Product);
    this.logger.debug(`Updated product: ${JSON.stringify(updatedProduct)}`);
    return updatedProduct;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.delete(id);
    this.logger.debug(`Deleted product with id: ${id}`);
  }
}
