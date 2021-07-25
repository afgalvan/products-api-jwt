import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: 'Bob' })
  username!: string;
  @ApiProperty({ example: 'bob@domain.com' })
  email!: string;
}
