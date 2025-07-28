import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyTypeActivityDto {
  @ApiProperty({ description: 'ID da propriedade', example: 1 })
  idProperty: number;

  @ApiProperty({ description: 'ID do tipo de atividade', example: 1 })
  idTypeActivity: number;
}

