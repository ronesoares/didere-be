import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  @ApiProperty({ description: 'Seller name', maxLength: 60 })
  name: string;

  @ApiProperty({ description: 'Seller token', maxLength: 6 })
  token: string;

  @ApiProperty({ description: 'Seller status', maxLength: 1 })
  status: string;

  @ApiProperty({ description: 'Commission percentage' })
  commissionPercentage: number;

  @ApiProperty({ description: 'System ID' })
  idSystem: number;
}

