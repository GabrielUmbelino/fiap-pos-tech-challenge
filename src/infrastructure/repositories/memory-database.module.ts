import { Module } from '@nestjs/common';
import { CustomerInMemoryRepository } from './customer';
import { ProductInMemoryRepository } from './product';

@Module({
  providers: [
    { provide: 'IRepository<Customer>', useClass: CustomerInMemoryRepository },
    { provide: 'IRepository<Product>', useClass: ProductInMemoryRepository },
  ],
  exports: [
    { provide: 'IRepository<Customer>', useClass: CustomerInMemoryRepository },
    { provide: 'IRepository<Product>', useClass: ProductInMemoryRepository },
  ],
})
export class MemoryDatabaseModule {}
