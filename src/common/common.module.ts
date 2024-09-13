import { Module } from '@nestjs/common';
import { MongoModule } from './mongo.module';
import { ConfigModule } from './config.module';

@Module({
  imports: [MongoModule, ConfigModule],
  exports: [MongoModule, ConfigModule],
})
export class CommonModule {}
