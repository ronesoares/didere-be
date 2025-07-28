import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyRentalPeriodDto {
  @ApiProperty({ description: 'ID da propriedade', example: 1 })
  idProperty: number;

  @ApiProperty({ description: 'Data de início', example: '2024-01-01' })
  startDate: Date;

  @ApiProperty({ description: 'Data de fim', example: '2024-12-31' })
  endDate: Date;

  @ApiProperty({ description: 'Hora de início', example: '08:00' })
  startHour?: string;

  @ApiProperty({ description: 'Hora de fim', example: '18:00' })
  endHour?: string;

  @ApiProperty({ description: 'Disponível no domingo', example: 'Y', enum: ['Y', 'N'] })
  sunday?: string;

  @ApiProperty({ description: 'Disponível na segunda', example: 'Y', enum: ['Y', 'N'] })
  monday?: string;

  @ApiProperty({ description: 'Disponível na terça', example: 'Y', enum: ['Y', 'N'] })
  tuesday?: string;

  @ApiProperty({ description: 'Disponível na quarta', example: 'Y', enum: ['Y', 'N'] })
  wednesday?: string;

  @ApiProperty({ description: 'Disponível na quinta', example: 'Y', enum: ['Y', 'N'] })
  thursday?: string;

  @ApiProperty({ description: 'Disponível na sexta', example: 'Y', enum: ['Y', 'N'] })
  friday?: string;

  @ApiProperty({ description: 'Disponível no sábado', example: 'Y', enum: ['Y', 'N'] })
  saturday?: string;
}

