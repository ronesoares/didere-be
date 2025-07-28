import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsArray, IsDateString, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SearchPropertyDto {
  @ApiPropertyOptional({ description: 'ID da cidade' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  idCity?: number;

  @ApiPropertyOptional({ description: 'ID do estado' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  idState?: number;

  @ApiPropertyOptional({ description: 'Texto para buscar no título ou descrição' })
  @IsOptional()
  @IsString()
  titleContains?: string;

  @ApiPropertyOptional({ description: 'Texto para buscar no bairro' })
  @IsOptional()
  @IsString()
  neighborhoodContains?: string;

  @ApiPropertyOptional({ description: 'Altura mínima' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  heightGreaterThan?: number;

  @ApiPropertyOptional({ description: 'Altura máxima' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  heightLessThan?: number;

  @ApiPropertyOptional({ description: 'Largura mínima' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  widthGreaterThan?: number;

  @ApiPropertyOptional({ description: 'Largura máxima' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  widthLessThan?: number;

  @ApiPropertyOptional({ description: 'Profundidade mínima' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  depthGreaterThan?: number;

  @ApiPropertyOptional({ description: 'Profundidade máxima' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  depthLessThan?: number;

  @ApiPropertyOptional({ description: 'Valor mínimo' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valueGreaterThan?: number;

  @ApiPropertyOptional({ description: 'Valor máximo' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valueLessThan?: number;

  @ApiPropertyOptional({ description: 'Data de início do período' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Data de fim do período' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Hora de início (formato HH:mm)' })
  @IsOptional()
  @IsString()
  startHour?: string;

  @ApiPropertyOptional({ description: 'Hora de fim (formato HH:mm)' })
  @IsOptional()
  @IsString()
  endHour?: string;

  @ApiPropertyOptional({ 
    description: 'Lista de periodicidades', 
    type: [String],
    enum: ['H', 'D', 'S', 'M']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsIn(['H', 'D', 'S', 'M'], { each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  periodicityList?: string[];

  @ApiPropertyOptional({ 
    description: 'Lista de IDs de características',
    type: [Number]
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  featureList?: number[];

  @ApiPropertyOptional({ 
    description: 'Lista de IDs de tipos de atividade',
    type: [Number]
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  typeActivityList?: number[];

  @ApiPropertyOptional({ 
    description: 'Filtrar apenas períodos ativos (Y/N)',
    enum: ['Y', 'N'],
    default: 'Y'
  })
  @IsOptional()
  @IsString()
  @IsIn(['Y', 'N'])
  onlyActive?: string = 'Y';
}

