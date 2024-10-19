import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../shared/models';
import { OrderEntity } from './orderEntity';
import { IRepository } from '../iRepository';

@Injectable()
export class OrderInDbRepository implements IRepository<Order> {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
  ) {}

  async create(order: Order): Promise<Order> {
    try {
      const createdOrder = await this.repository.save({
        status: order.status,
        totalPrice: order.totalPrice,
        user: order.user,
      });
      return createdOrder;
    } catch (error) {
      throw new Error(
        `An error occurred while saving the order to the database: '${JSON.stringify(order)}': ${error.message}`,
      );
    }
  }

  find(orderId: number): Promise<Order[]> {
    return this.repository
      .createQueryBuilder('order')
      .where('order.id = :orderId', {
        orderId: orderId,
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
        return orderEntities.map((orderEntity) => ({
          id: orderEntity.id,
          status: orderEntity.status,
          totalPrice: orderEntity.totalPrice,
          items: orderEntity.items,
          user: orderEntity.user,
        }));
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while creating an order in the database: ${error.message}`,
        );
      });
  }

  findById(id: number): Promise<Order> {
    return this.repository
      .createQueryBuilder('order')
      .where('order.id = :orderId', {
        orderId: id,
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

  async edit(order: Order): Promise<Order> {
    try {
      const updatedOrder = await this.repository.save(order);

      return updatedOrder;
    } catch (error) {
      throw new Error(
        `An error occurred while saving the order to the database: '${JSON.stringify(order)}': ${error.message}`,
      );
    }
  }
}
