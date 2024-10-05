import { IsNotEmpty } from 'class-validator';

export class CustomerCommand {
  @IsNotEmpty()
  name: string;
}
