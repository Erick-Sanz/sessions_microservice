import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Token {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    type: String,
    trim: true,
  })
  userId: string;
  @Prop({
    type: String,
    trim: true,
  })
  token: string;
  @Prop({
    type: String,
    trim: true,
  })
  userAgent: string;
  @Prop({
    type: Date,
  })
  createdAt: Date;
  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
