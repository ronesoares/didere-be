import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto {
  @ApiProperty({ description: 'Module name', maxLength: 45 })
  name: string;

  @ApiProperty({ description: 'System ID' })
  idSystem: number;
}

