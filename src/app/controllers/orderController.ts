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
import { CustomerService, OrderService, ProductService } from '../../domain';
import { Order, OrderDto, FilterOrderDto } from '../../shared/models';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(
    @Inject('IService<Order>') private orderService: OrderService,
    @Inject('IService<Product>') private productService: ProductService,
    @Inject('IService<Customer>') private customerService: CustomerService,
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
  find(
    @Query('id') id?: number,
    @Query('customerId') customerId?: number,
    @Query('status') status?: Order['status'],
  ): Promise<Order[]> {
    const filterOrderDto: FilterOrderDto = {
      id,
      customerId,
      status,
    };

    return this.orderService.find(filterOrderDto);
  }

  @Post()
  async create(@Body() orderDto: OrderDto): Promise<Order> {
    const customer = this.customerService.find({ id: orderDto.customerId });

    const order = {
      status: orderDto.status,
      customer,
    };
    const createdOrder = await this.orderService.create(order);
    this.logger.debug({ createdOrder });
    return order;
  }

  @Put(':id')
  async put(@Body() orderDto: OrderDto): Promise<Order> {
    const updatedOrder = await this.orderService.edit(orderDto as Order);
    this.logger.debug(`Updated order: ${JSON.stringify(updatedOrder)}`);
    return updatedOrder;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderService.delete(id);
    this.logger.debug(`Deleted order with id: ${id}`);
  }
}
