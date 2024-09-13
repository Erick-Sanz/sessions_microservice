import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './entities/token.entity';
import { Model } from 'mongoose';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenModel: Model<Token>,
    private jwtService: JwtService,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const { userId, userName, userAgent } = createTokenDto;
    const payload = { userId, userName };
    const accessToken = await this.jwtService.signAsync(payload);
    const user = await this.tokenModel.findOneAndUpdate(
      { userId },
      { token: accessToken, userAgent },
      { upsert: true, new: true },
    );
    return user;
  }

  async verifyAccesToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      const tokenSign = await this.jwtService.sign(user);
      const userAuth = await this.tokenModel
        .findOne({ userId: user.userId })
        .lean();
      if (userAuth.token !== token) {
        throw new RpcException({
          status: 401,
          message: 'session blocked',
        });
      }
      return {
        user,
        token: tokenSign,
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new RpcException({
          status: 401,
          message: 'session has expired',
        });
      }
      throw new RpcException({
        status: 401,
        message: 'Invalid token',
      });
    }
  }

  async remove(userId: string): Promise<any> {
    return await this.tokenModel.deleteOne({
      userId,
    });
  }
}
