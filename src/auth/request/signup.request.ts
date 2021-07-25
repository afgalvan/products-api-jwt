import { ApiProperty } from '@nestjs/swagger';
export class CreateUser {
  @ApiProperty()
  username!: string;
  @ApiProperty()
  email!: string;
  @ApiProperty()
  password!: string;
}
