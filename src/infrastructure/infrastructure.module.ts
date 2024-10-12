import { Global, Module } from '@nestjs/common';
import { RepositoryModule } from './repositories/repository.module';

@Global()
@Module({
  imports: [RepositoryModule.forFeature()],
  exports: [RepositoryModule.forFeature()],
})
export class InfrastructureModule {}
