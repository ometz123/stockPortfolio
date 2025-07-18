import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Portfolio extends Document {
  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({
    required: true,
    type: [String],
    validate: {
      validator: (arr: string[]) => new Set(arr).size === arr.length,
      message: 'Each stock symbol must be unique in the portfolio',
    },
  })
  stocks: string[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
