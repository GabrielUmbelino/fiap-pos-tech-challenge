import { Order } from '../../../shared/models';
import { IRepository } from '../iRepository';

export class MockOrderRepository implements IRepository<Order> {
  private readonly orders: Order[] = [];

  async create(order: Order): Promise<Order> {
    this.orders.push(order);
    return Promise.resolve(order);
  }

  async findAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  async find(orderDto: Order): Promise<Order[]> {
    const filteredOrders = this.orders.filter((order) => {
      if (orderDto.id && order.id === orderDto.id) return true;
      if (orderDto.customer.id && order.customer.id === orderDto.customer.id)
        return true;
      return false;
    });

    return Promise.resolve(filteredOrders);
  }

  async edit(orderDto: Order): Promise<Order> {
    const orderIndex = this.orders.findIndex(
      (order) => order.id === orderDto.id,
    );
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }

    const updatedOrder = { ...this.orders[orderIndex], ...orderDto };
    this.orders[orderIndex] = updatedOrder;
    return Promise.resolve(updatedOrder);
  }

  async delete(id: number): Promise<void> {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }

    this.orders.splice(orderIndex, 1);
    return Promise.resolve();
  }
}
