import { randomUUID } from 'crypto';

export class Customer {
  private id: string;
  name: string;
  constructor(name: string) {
    this.id = randomUUID();
    this.name = name;
  }
}
