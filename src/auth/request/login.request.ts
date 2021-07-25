import { ApiProperty } from '@nestjs/swagger';
export class LoginUser {
  @ApiProperty()
  usernameOrEmail!: string;
  @ApiProperty()
  password!: string;
}
