import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ description: 'Tenant name', maxLength: 60 })
  name: string;

  @ApiProperty({ description: 'Phone number', maxLength: 12 })
  phoneNumber: string;

  @ApiProperty({ description: 'Email address', maxLength: 50 })
  email: string;

  @ApiProperty({ description: 'Document number', maxLength: 15, required: false })
  document?: string;

  @ApiProperty({ description: 'Birthday', type: Date, required: false })
  birthday?: Date;

  @ApiProperty({ description: 'Address ID', required: false })
  idAddress?: number;
}

