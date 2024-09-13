import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [CommonModule, TokensModule],
})
export class AppModule {}
