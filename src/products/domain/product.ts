import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Product {
  _id?: string;
  @Prop({ trim: true })
  name!: string;
  @Prop()
  imageUrl!: URL;
  @Prop()
  description?: string;
  @Prop()
  price!: number;
}
