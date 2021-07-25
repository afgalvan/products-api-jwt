import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ trim: true })
  username!: string;
  @Prop({ unique: true, trim: true })
  email!: string;
  @Prop()
  password!: string;
}
