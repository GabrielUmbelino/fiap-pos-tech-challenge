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
} from '@nestjs/common';
import { Category, CategoryDto } from '../../shared/models';
import { ApiQuery } from '@nestjs/swagger';
import { IService } from '../../domain/iService';

@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(
    @Inject('IService<Category>') private categoryService: IService<Category>,
  ) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'categoryName',
    type: String,
    required: false,
  })
  @Get(':id')
  find(@Param('id') id?: number): Promise<Category[]> {
    return this.categoryService.find(id);
  }

  @Post()
  async create(@Body() categoryDto: CategoryDto): Promise<Category> {
    const category = await this.categoryService.create(categoryDto as Category);
    this.logger.debug(categoryDto);
    this.logger.debug({ category });
    return category;
  }

  @Put(':id')
  async edit(@Body() categoryDto: CategoryDto): Promise<Category> {
    const updatedCategory = await this.categoryService.edit(
      categoryDto as Category,
    );
    this.logger.debug(`Updated category: ${JSON.stringify(updatedCategory)}`);
    return updatedCategory;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.categoryService.delete(id);
    this.logger.debug(`Deleted category with id: ${id}`);
  }
}
