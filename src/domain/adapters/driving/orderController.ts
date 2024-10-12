import { FilterOrderDto } from './../../ports/model/order';
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
import { OrderService } from '../../ports/inboundPorts/orderService';
import { Order, OrderDto } from '../../ports/model/order';
import { ApiQuery } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private orderService: OrderService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'customerName',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'orderStatus',
    type: String,
    required: true,
  })
  @Get(':params')
  find(
    @Query('id') id?: string,
    @Query('customerName') customerName?: string,
    @Query('orderStatus') orderStatus?: string,
  ): Promise<Order[]> {
    const filterOrderDto: FilterOrderDto = {
      id,
      customerName,
      orderStatus,
    };

    return this.orderService.find(filterOrderDto);
  }

  @Post()
  async create(@Body() orderDto: OrderDto): Promise<Order> {
    const order = await this.orderService.create(orderDto);
    this.logger.debug(orderDto);
    this.logger.debug({ order });
    return order;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() orderDto: OrderDto,
  ): Promise<Order> {
    const updatedOrder = await this.orderService.update(id, orderDto);
    this.logger.debug(`Updated order: ${JSON.stringify(updatedOrder)}`);
    return updatedOrder;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.orderService.remove(id);
    this.logger.debug(`Deleted order with id: ${id}`);
  }
}
