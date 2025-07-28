import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ description: 'ZIP code', maxLength: 10 })
  zipCode: string;

  @ApiProperty({ description: 'Street name', maxLength: 60 })
  name: string;

  @ApiProperty({ description: 'Neighborhood', maxLength: 60 })
  neighborhood: string;

  @ApiProperty({ description: 'Street number', required: false })
  number?: number;

  @ApiProperty({ description: 'Address complement', maxLength: 100, required: false })
  complement?: string;

  @ApiProperty({ description: 'City ID' })
  idCity: number;

  @ApiProperty({ description: 'State ID' })
  idState: number;
}

