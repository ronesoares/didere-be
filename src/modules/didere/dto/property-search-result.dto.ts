import { ApiProperty } from '@nestjs/swagger';

export class PropertySearchResultDto {
  @ApiProperty({ description: 'ID da propriedade' })
  id: number;

  @ApiProperty({ description: 'Título da propriedade' })
  title: string;

  @ApiProperty({ description: 'Descrição da propriedade' })
  description: string;

  @ApiProperty({ description: 'URL do Google Maps', required: false })
  urlMaps?: string;

  @ApiProperty({ description: 'Altura da propriedade' })
  height: number;

  @ApiProperty({ description: 'Largura da propriedade' })
  width: number;

  @ApiProperty({ description: 'Profundidade da propriedade' })
  depth: number;

  @ApiProperty({ description: 'Periodicidade (Hora, Dia, Semana, Mês)' })
  periodicity: string;

  @ApiProperty({ description: 'Valor da propriedade' })
  value: number;

  @ApiProperty({ description: 'Bairro' })
  neighborhood: string;

  @ApiProperty({ description: 'Cidade' })
  city: string;

  @ApiProperty({ description: 'Estado (abreviação)' })
  state: string;

  @ApiProperty({ description: 'Foto principal', required: false })
  photo?: string;

  @ApiProperty({ description: 'Características concatenadas' })
  features: string;

  @ApiProperty({ description: 'Tipos de atividade concatenados' })
  typeActivities: string;

  @ApiProperty({ description: 'Períodos de aluguel formatados' })
  rentalPeriod: string;
}

