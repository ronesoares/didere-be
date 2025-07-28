import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemParameterDto {
  @ApiProperty({ description: 'Nome do parâmetro', example: 'MAX_LOGIN_ATTEMPTS' })
  name: string;

  @ApiProperty({ description: 'Valor do parâmetro', example: '3', required: false })
  value?: string;
}

