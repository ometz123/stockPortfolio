import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Portfolio extends Document {
  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true })
  stocks: string[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
