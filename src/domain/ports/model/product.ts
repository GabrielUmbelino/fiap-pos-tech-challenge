import { randomUUID } from 'crypto';

export class Product {
  private id: string;
  name: string;
  unit_value: number;

  constructor(name: string, unit_value: number) {
    this.id = randomUUID();
    this.name = name;
    this.unit_value = unit_value;
  }
}
