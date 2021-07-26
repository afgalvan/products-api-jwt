import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: '60fecef97151b5572b5bcd3f' })
  _id?: string;
  @ApiProperty({ example: 'Bob' })
  username!: string;
  @ApiProperty({ example: 'bob@domain.com' })
  email!: string;
}
