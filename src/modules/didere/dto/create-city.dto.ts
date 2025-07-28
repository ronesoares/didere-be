import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ description: 'City ID' })
  id: number;

  @ApiProperty({ description: 'City name', maxLength: 60 })
  name: string;

  @ApiProperty({ description: 'State ID' })
  idState: number;
}

