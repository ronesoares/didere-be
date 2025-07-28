import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty({ description: 'State ID' })
  id: number;

  @ApiProperty({ description: 'State name', maxLength: 45 })
  name: string;

  @ApiProperty({ description: 'State abbreviation', maxLength: 2 })
  abbreviation: string;
}

