import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Date, Schema as MSchema } from 'mongoose';

export type RunDocument = Run & Document;

@Schema()
export class Run {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true, type: Date })
  endDate: Date;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  emission: number;

  @Prop({ required: true })
  velocity: number[];

  @Prop({ required: true, type: Object })
  snapshot: [{
    point: number[];
    time: number;
  }];
}

export const RunSchema = SchemaFactory.createForClass(Run);