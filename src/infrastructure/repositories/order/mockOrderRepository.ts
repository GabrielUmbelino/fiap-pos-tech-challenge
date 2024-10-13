import { Order, OrderDto } from '../../../shared/models';
import { IRepository } from '../iRepository';

export class MockOrderRepository implements IRepository<Order> {
  private readonly orders: Order[] = [];

  async create(orderDto: OrderDto): Promise<Order> {
    const createdOrder = new Order(orderDto);
    this.orders.push(createdOrder);
    return Promise.resolve(createdOrder);
  }

  async findAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  async find(filterOrderDto: OrderDto): Promise<Order[]> {
    const filteredOrders = this.orders.filter((order) => {
      if (filterOrderDto.id && order.id === filterOrderDto.id) return true;
      if (
        filterOrderDto.customerId &&
        order.customerId === filterOrderDto.customerId
      )
        return true;
      return false;
    });

    return Promise.resolve(filteredOrders);
  }

  async edit(orderDto: OrderDto): Promise<Order> {
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
