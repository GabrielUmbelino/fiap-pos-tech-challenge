import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, FilterOrderDto } from '../../../shared/models';
import { OrderEntity } from './order.entity';
import { IRepository } from '../iRepository';

@Injectable()
export class OrderInDbRepository implements IRepository<Order> {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
  ) {}

  async create(order: Order): Promise<Order> {
    try {
      console.log('create order');
      const createdOrder = await this.repository.save({
        status: order.status,
        totalPrice: order.totalPrice,
        customer: order.customer,
      });

      // const items = await this.orderItemRepository.find({
      //   orderId: createdOrder.id,
      // });
      return createdOrder;
    } catch (error) {
      throw new Error(
        `An error occurred while saving the order to the database: '${JSON.stringify(order)}': ${error.message}`,
      );
    }
  }

  find(order: FilterOrderDto): Promise<Order[]> {
    return this.repository
      .createQueryBuilder('order')
      .where('order.orderId = :orderId', {
        orderDto: order.id,
      })
      .getMany()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the order in the database: ${error.message}`,
        );
      });
  }

  findAll(): Promise<Order[]> {
    return this.repository
      .createQueryBuilder('order')
      .getMany()
      .then((orderEntities) => {
        console.log(orderEntities);
        return orderEntities.map((orderEntity) => ({
          id: orderEntity.id,
          status: orderEntity.status,
          totalPrice: orderEntity.totalPrice,
          items: orderEntity.items,
          customer: orderEntity.customer,
        }));
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while creating an order in the database: ${error.message}`,
        );
      });
  }

  findById(filterOrderDto: FilterOrderDto): Promise<Order> {
    return this.repository
      .createQueryBuilder('order')
      .where('order.id = :orderId', {
        orderId: filterOrderDto.id,
      })
      .getOne()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the order in the database: ${error.message}`,
        );
      });
  }

  delete(id): Promise<void> {
    throw new Error('Method not implemented.' + id);
  }

  edit(): Promise<Order> {
    throw new Error('Method not implemented.');
  }
}
