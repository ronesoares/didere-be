import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyRentalPeriodDto {
  @ApiProperty({ description: 'Data de início', example: '2024-01-01' })
  startDate: string;

  @ApiProperty({ description: 'Data de fim', example: '2024-12-31' })
  endDate: string;

  @ApiProperty({ description: 'Hora de início', example: '08:00', default: '00:00' })
  startHour?: string;

  @ApiProperty({ description: 'Hora de fim', example: '18:00', default: '23:59' })
  endHour?: string;

  @ApiProperty({ description: 'Disponível no domingo', example: 'Y', enum: ['Y', 'N'], default: 'Y' })
  sunday?: string;

  @ApiProperty({ description: 'Disponível na segunda', example: 'Y', enum: ['Y', 'N'], default: 'Y' })
  monday?: string;

  @ApiProperty({ description: 'Disponível na terça', example: 'Y', enum: ['Y', 'N'], default: 'Y' })
  tuesday?: string;

  @ApiProperty({ description: 'Disponível na quarta', example: 'Y', enum: ['Y', 'N'], default: 'Y' })
  wednesday?: string;

  @ApiProperty({ description: 'Disponível na quinta', example: 'Y', enum: ['Y', 'N'], default: 'Y' })
  thursday?: string;

  @ApiProperty({ description: 'Disponível na sexta', example: 'Y', enum: ['Y', 'N'], default: 'Y' })
  friday?: string;

  @ApiProperty({ description: 'Disponível no sábado', example: 'Y', enum: ['Y', 'N'], default: 'Y' })
  saturday?: string;
}

