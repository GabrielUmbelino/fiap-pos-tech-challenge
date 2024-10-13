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

  create(order: Order): Promise<Order> {
    return this.repository
      .save({
        status: order.status,
      })
      .then((orderEntity) => {
        return new Order({
          id: orderEntity.id,
          status: orderEntity.status,
          customerId: null,
          orderProducts: [],
        });
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while saving the order to the database: '${JSON.stringify(order)}': ${error.message}`,
        );
      });
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  find(orderDto: FilterOrderDto): Promise<Order[]> {
    return this.repository
      .findBy(orderDto)
      .then((orderEntities) => {
        return orderEntities.map((orderEntity) => ({
          id: orderEntity.id,
          status: orderEntity.status,
          customerId: null,
          orderProducts: [],
        }));
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the customer in the database: '${JSON.stringify(orderDto)}': ${error.message}`,
        );
      });
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  edit(): Promise<Order> {
    throw new Error('Method not implemented.');
  }
}
