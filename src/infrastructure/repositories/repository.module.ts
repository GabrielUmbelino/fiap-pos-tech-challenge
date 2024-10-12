import { DynamicModule, Module } from '@nestjs/common';
import { MemoryDatabaseModule } from './memory-database.module';

@Module({})
export class RepositoryModule {
  static forFeature(): DynamicModule {
    // if (process.env.NODE_ENV === 'use-memory-repository') {
    return {
      module: MemoryDatabaseModule,
      exports: [MemoryDatabaseModule],
    };
    // } else {
    // return {
    // module: TypeormDatabaseModule,
    // exports: [TypeormDatabaseModule],
    // };
    // }
  }
}
