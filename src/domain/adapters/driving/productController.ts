import { Body, Controller, Get, Logger, Post, Put } from '@nestjs/common';
import { ProductService } from '../../ports/inboundPorts/productService';
import { ProductCommand } from '../model/productCommand';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private productService: ProductService) {}

  @Get()
  findAll(): any[] {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() productCommand: ProductCommand): any {
    const product = this.productService.create(productCommand.name, productCommand.unit_value);
    this.logger.debug(productCommand);
    this.logger.debug({ product });
    return { ...product };
  }
}


