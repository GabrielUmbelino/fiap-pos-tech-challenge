import { Module } from '@nestjs/common';
import { ApplicationModule } from './app/application.module';
@Module({
  imports: [ApplicationModule],
})
export class AppModule {}
