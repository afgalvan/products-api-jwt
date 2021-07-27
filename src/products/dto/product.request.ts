import { ApiProperty } from '@nestjs/swagger';

export class CreateProduct {
  @ApiProperty()
  name!: string;
  @ApiProperty({ example: 'https://imageurl.jpg', type: 'string(url)' })
  imageUrl!: URL;
  @ApiProperty({ required: false })
  description?: string;
  @ApiProperty()
  price!: number;
}
