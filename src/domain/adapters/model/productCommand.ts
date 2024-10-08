import { IsNotEmpty } from 'class-validator';

export class ProductCommand {
  @IsNotEmpty()
  name: string;
  unit_value: number;
}
