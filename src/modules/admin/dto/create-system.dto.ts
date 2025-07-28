import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDto {
  @ApiProperty({ description: 'System name', maxLength: 45 })
  name: string;
}

