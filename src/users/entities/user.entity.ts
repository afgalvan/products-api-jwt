import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User {
  _id?: string;
  @Prop({ unique: true, trim: true })
  username!: string;
  @Prop({ unique: true, trim: true })
  email!: string;
  @Prop()
  password!: string;
}
