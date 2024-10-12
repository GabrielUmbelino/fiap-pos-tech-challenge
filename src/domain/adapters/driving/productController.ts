import { FilterProductDto } from './../../ports/model/product';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from '../../ports/inboundPorts/productService';
import { Product, ProductDto } from '../../ports/model/product';
import { ApiQuery } from '@nestjs/swagger';
import { Category } from 'src/domain/ports/model/category';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'productName',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'unitValue',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'productCategory',
    type: Category,
    required: false,
  })
  @Get(':params')
  find(
    @Query('id') id?: string,
    @Query('name') productName?: string,
    @Query('unitValue') unitValue?: number,
    @Query('productCategory') productCategory?: Category,
  ): Promise<Product[]> {
    const filterProductDto: FilterProductDto = {
      id,
      productName,
      unitValue,
      productCategory,
    };

    return this.productService.find(filterProductDto);
  }

  @Post()
  async create(@Body() productDto: ProductDto): Promise<Product> {
    const product = await this.productService.create(productDto);
    this.logger.debug(productDto);
    this.logger.debug({ product });
    return product;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productService.update(id, productDto);
    this.logger.debug(`Updated product: ${JSON.stringify(updatedProduct)}`);
    return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.productService.remove(id);
    this.logger.debug(`Deleted product with id: ${id}`);
  }
}
