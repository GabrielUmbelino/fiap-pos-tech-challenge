import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database.module';

@Global()
@Module({
  imports: [DatabaseModule.forFeature()],
  exports: [DatabaseModule.forFeature()],
})
export class InfrastructureModule {}
