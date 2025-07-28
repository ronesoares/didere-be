import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyFeatureDto {
  @ApiProperty({ description: 'ID da propriedade', example: 1 })
  idProperty: number;

  @ApiProperty({ description: 'ID da característica', example: 1 })
  idFeature: number;
}

