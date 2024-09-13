import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  @IsString()
  userAgent: string;
}
