import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { IService } from '../../domain/iService';
import { Order, OrderDto } from '../../shared/models';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(
    @Inject('IService<Order>') private orderService: IService<Order>,
  ) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiQuery({
    name: 'id',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'customerId',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    type: String,
    required: true,
  })
  @Get(':params')
  find(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id?: number): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Post()
  async create(@Body() orderDto: OrderDto): Promise<Order> {
    const createdOrder = await this.orderService.create(orderDto);
    this.logger.debug({ createdOrder });
    return createdOrder;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderService.delete(id);
    this.logger.debug(`Deleted order with id: ${id}`);
  }
}
