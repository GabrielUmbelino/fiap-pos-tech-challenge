import { Order, OrderDto } from '../../ports/model/order';
import { IOrderRepository } from '../../ports/outboundPorts/iOrderRepository';

export class MockOrderRepository implements IOrderRepository {
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
      if (filterOrderDto.name && order.name === filterOrderDto.name)
        return true;
      if (
        filterOrderDto.unitValue !== undefined &&
        order.unitValue === filterOrderDto.unitValue
      )
        return true;
      return false;
    });

    return Promise.resolve(filteredOrders);
  }

  async update(id: string, orderDto: OrderDto): Promise<Order> {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }

    const updatedOrder = { ...this.orders[orderIndex], ...orderDto };
    this.orders[orderIndex] = updatedOrder;
    return Promise.resolve(updatedOrder);
  }

  async remove(id: string): Promise<void> {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }

    this.orders.splice(orderIndex, 1);
    return Promise.resolve();
  }
}
