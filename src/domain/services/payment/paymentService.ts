import { Inject, Logger } from '@nestjs/common';
import { Order } from '../../../shared/models';
import { IPaymentService } from './iPaymentService';
import { PaymentDto } from '../../../shared/models/payment';
import { OrderStatusEnum, PaymentMethodEnum } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

export class PaymentService implements IPaymentService {
  private logger: Logger = new Logger(PaymentService.name);
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
  ) {}

  generateQrCodePaymentUrl(order: Order): Promise<string> {
    this.logger.debug(
      `Generating QRCode for payment of the order ${JSON.stringify(order)}`,
    );

    // TODO: implement Mercado Pago qr code payment integration
    return Promise.resolve('qrcode-url');
  }

  async payOrder(paymentDto: PaymentDto): Promise<string> {
    const orders = await this.orderRepository.find(paymentDto.orderId);

    if (!orders?.length) {
      throw new Error(`Order Not Found`);
    }

    const [order] = orders;
    if (order.status === OrderStatusEnum.CANCELED) {
      throw new Error(`Order has been cancelled.`);
    }

    if (
      [
        OrderStatusEnum.PAYMENT_APPROVED,
        OrderStatusEnum.READY,
        OrderStatusEnum.FINISHED,
      ].includes(order.status)
    ) {
      throw new Error(`Order is paid already.`);
    }

    if (order.status !== OrderStatusEnum.CONFIRMED) {
      throw new Error(`Order needs to be confirmed to be paid.`);
    }

    if (paymentDto.paymentMethod === PaymentMethodEnum.CREDIT_CARD) {
      throw new Error('Method not implemented.');
    }

    if (paymentDto.paymentMethod === PaymentMethodEnum.PIX) {
      throw new Error('Method not implemented.');
    }

    if (paymentDto.paymentMethod === PaymentMethodEnum.QR_CODE) {
      try {
        const paymentResult = this.generateQrCodePaymentUrl(order);

        await this.orderRepository.edit({
          ...order,
          status: OrderStatusEnum.WAITING_PAYMENT,
        });
        return paymentResult;
      } catch (error) {
        throw new Error(
          `An error occurred while creating qr code and saving the order ${JSON.stringify(order)}: ${error.message}`,
        );
      }
    }
  }
}
