import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Date } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: Date})
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);