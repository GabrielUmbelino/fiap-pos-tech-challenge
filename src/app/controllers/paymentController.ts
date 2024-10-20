import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { PaymentDto } from '../../shared/models/payment';
import { IPaymentService } from '../../domain';

@Controller('/payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  constructor(
    @Inject('IPaymentService') private paymentService: IPaymentService,
  ) {}

  @Post()
  async pay(@Body() paymentDto: PaymentDto): Promise<string> {
    const paymentUrl = await this.paymentService.payOrder(paymentDto);
    this.logger.debug({ paymentUrl });
    return paymentUrl;
  }
}
