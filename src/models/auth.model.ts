import { ApiProperty } from '@nestjs/swagger';

export class AuthModel {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
