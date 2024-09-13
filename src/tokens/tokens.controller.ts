import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller()
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @MessagePattern({ cmd: 'createAccesToken' })
  create(@Payload() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }

  @MessagePattern({ cmd: 'verifyAccesToken' })
  verifyAccesToken(@Payload() token: string) {
    return this.tokensService.verifyAccesToken(token);
  }

  @MessagePattern({ cmd: 'logout' })
  remove(@Payload() userId: string) {
    return this.tokensService.remove(userId);
  }
}
