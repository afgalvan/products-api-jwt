import { SchemaFactory } from '@nestjs/mongoose';

import { User } from '../domain/user';

export const userSchema = SchemaFactory.createForClass(User);
