import { SchemaFactory } from '@nestjs/mongoose';

import { Product } from './../domain/product';

export const productSchema = SchemaFactory.createForClass(Product);
