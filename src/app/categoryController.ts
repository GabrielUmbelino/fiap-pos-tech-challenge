import { FilterCategoryDto } from './../../ports/model/category';
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
import { CategoryService } from '../../ports/inboundPorts/categoryService';
import { Category, CategoryDto } from '../../ports/model/category';
import { ApiQuery } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(private categoryService: CategoryService) {}

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
  @Get(':params')
  find(
    @Query('id') id?: string,
    @Query('categoryName') categoryName?: string,
  ): Promise<Category[]> {
    const filterCategoryDto: FilterCategoryDto = {
      id,
      categoryName,
    };

    return this.categoryService.find(filterCategoryDto);
  }

  @Post()
  async create(@Body() categoryDto: CategoryDto): Promise<Category> {
    const category = await this.categoryService.create(categoryDto);
    this.logger.debug(categoryDto);
    this.logger.debug({ category });
    return category;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryService.update(id, categoryDto);
    this.logger.debug(`Updated category: ${JSON.stringify(updatedCategory)}`);
    return updatedCategory;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryService.remove(id);
    this.logger.debug(`Deleted category with id: ${id}`);
  }
}
