import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemParameterDto {
  @ApiProperty({ description: 'Nome do parâmetro', example: 'MAX_LOGIN_ATTEMPTS', required: false })
  name?: string;

  @ApiProperty({ description: 'Valor do parâmetro', example: '3', required: false })
  value?: string;
}

