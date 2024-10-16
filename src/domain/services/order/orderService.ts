import { Inject, Injectable } from '@nestjs/common';
import { Order, FilterOrderDto, OrderDto } from '../../../shared/models';
import { IService } from '../../iService';
import { CustomerService } from '../customer';
import { OrderInDbRepository } from '../../../infrastructure/repositories/order';

@Injectable()
export class OrderService implements IService<Order> {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: OrderInDbRepository,
    @Inject('IService<Customer>')
    private readonly customerService: CustomerService,
    // @Inject('IService<OrderItem>')
    // private readonly orderItemService: IService<OrderItem>,
  ) {}
  create(): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  async createFromDto(orderDto: OrderDto): Promise<Order> {
    const customer = await this.customerService.findById(orderDto.customerId);
    if (!customer) {
      throw new Error('Customer not provided');
    }
    // const productIds = orderDto.items.map((item) => item.productId).flat();
    // const orderProducts = await this.productService.find({
    //   ids: productIds,
    // } as FilterProductDto);
    console.log('customers', customer);

    const createdOrder = await this.orderRepository.create({
      customer,
      totalPrice: '0',
      status: 'new',
    });

    // const items = orderDto.items.map((item) => {
    //   const product = orderProducts.find(({ id }) => id === item.id);
    //   const orderItem = new OrderItem(item, product);
    //   return orderItem;
    // });

    // const promises = items.map((item) => {
    //   return this.orderItemService.create(item);
    // });

    // await Promise.all(promises);
    // const filterOrderDto: FilterOrderDto = {
    //   ids: [createdOrder.id],
    // };
    // const [orderWithItems] = await this.orderRepository.find(filterOrderDto);
    // console.log({ orderWithItems });
    return createdOrder;
  }

  async editFromDto(orderDto: OrderDto): Promise<Order> {
    const order = await this.orderRepository.findById({
      id: orderDto.id,
    });
    console.log({
      ...order,
      status: orderDto.status,
    });
    return this.orderRepository.edit();
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  find(order: FilterOrderDto): Promise<Order[]> {
    return this.orderRepository.find(order);
  }

  findById(filterOrderDto: FilterOrderDto): Promise<Order> {
    return this.orderRepository.findById(filterOrderDto);
  }

  edit(): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
