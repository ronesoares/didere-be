import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { CreatePropertyRentalPeriodDto } from './create-property-rental-period.dto';

export class CreatePropertyDto {
  @ApiProperty({ description: 'ID do locador', example: 1 })
  idLocator: number;

  @ApiProperty({ description: 'Título da propriedade', example: 'Espaço Comercial no Centro' })
  title: string;

  @ApiProperty({ description: 'Descrição da propriedade', example: 'Excelente localização...', required: false })
  description?: string;

  @ApiProperty({ description: 'Altura em metros', example: 3.5 })
  height: number;

  @ApiProperty({ description: 'Largura em metros', example: 10.0 })
  width: number;

  @ApiProperty({ description: 'Profundidade em metros', example: 15.0 })
  depth: number;

  @ApiProperty({ description: 'Foto principal (base64)', required: false })
  mainPhoto?: string;

  @ApiProperty({ description: 'Periodicidade', example: 'M', enum: ['D', 'W', 'M', 'Y'] })
  periodicity?: string;

  @ApiProperty({ description: 'Valor do aluguel', example: 2500.00 })
  value: number;

  @ApiProperty({ description: 'URL do Google Maps', required: false })
  urlMaps?: string;

  // Dados do endereço
  @ApiProperty({ description: 'Dados do endereço', type: CreateAddressDto })
  address: CreateAddressDto;

  // Lista de IDs das características
  @ApiProperty({ description: 'Lista de IDs das características', example: [1, 2, 3], type: [Number] })
  featureIds: number[];

  // Lista de IDs dos tipos de atividade
  @ApiProperty({ description: 'Lista de IDs dos tipos de atividade', example: [1, 2], type: [Number] })
  typeActivityIds: number[];

  // Lista de períodos de aluguel
  @ApiProperty({ description: 'Lista de períodos de aluguel', type: [CreatePropertyRentalPeriodDto] })
  rentalPeriods: CreatePropertyRentalPeriodDto[];
}

