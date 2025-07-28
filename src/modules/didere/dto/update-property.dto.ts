import { ApiProperty } from '@nestjs/swagger';

export class UpdatePropertyDto {
  @ApiProperty({ description: 'ID do locador', example: 1, required: false })
  idLocator?: number;

  @ApiProperty({ description: 'Título da propriedade', example: 'Espaço Comercial no Centro', required: false })
  title?: string;

  @ApiProperty({ description: 'Descrição da propriedade', example: 'Excelente localização...', required: false })
  description?: string;

  @ApiProperty({ description: 'ID do endereço', example: 1, required: false })
  idAddress?: number;

  @ApiProperty({ description: 'Altura em metros', example: 3.5, required: false })
  height?: number;

  @ApiProperty({ description: 'Largura em metros', example: 10.0, required: false })
  width?: number;

  @ApiProperty({ description: 'Profundidade em metros', example: 15.0, required: false })
  depth?: number;

  @ApiProperty({ description: 'Foto principal (base64)', required: false })
  mainPhoto?: string;

  @ApiProperty({ description: 'Periodicidade', example: 'M', enum: ['D', 'W', 'M', 'Y'], required: false })
  periodicity?: string;

  @ApiProperty({ description: 'Valor do aluguel', example: 2500.00, required: false })
  value?: number;

  @ApiProperty({ description: 'URL do Google Maps', required: false })
  urlMaps?: string;
}

