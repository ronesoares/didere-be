import { ApiProperty } from '@nestjs/swagger';

export class CreateOwnerDto {
  @ApiProperty({ description: 'Owner name', maxLength: 60 })
  name: string;

  @ApiProperty({ description: 'Owner nickname', maxLength: 30, required: false })
  nickname?: string;

  @ApiProperty({ description: 'Primary phone number', maxLength: 12, required: false })
  phoneOption1?: string;

  @ApiProperty({ description: 'Secondary phone number', maxLength: 12, required: false })
  phoneOption2?: string;

  @ApiProperty({ description: 'Email address', maxLength: 50 })
  email: string;

  @ApiProperty({ description: 'Document number', maxLength: 15, required: false })
  document?: string;

  @ApiProperty({ description: 'Birthday', type: Date, required: false })
  birthday?: Date;

  @ApiProperty({ description: 'Seller token', maxLength: 6, required: false })
  tokenSeller?: string;

  @ApiProperty({ description: 'Address ID', required: false })
  idAddress?: number;

  @ApiProperty({ description: 'System ID' })
  idSystem: number;
}

