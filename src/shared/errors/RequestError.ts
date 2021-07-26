import { ApiProperty } from '@nestjs/swagger';

export class RequestError {
  @ApiProperty({ example: 400 })
  statusCode!: number;
  @ApiProperty({ example: 'Error message' })
  message!: string;
  @ApiProperty({ example: 'Bad request' })
  error!: string;
}
