import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiProperty({ description: 'CEP', example: '01234-567', required: false })
  zipCode?: string;

  @ApiProperty({ description: 'Nome da rua/avenida', example: 'Rua das Flores', required: false })
  name?: string;

  @ApiProperty({ description: 'Bairro', example: 'Centro', required: false })
  neighborhood?: string;

  @ApiProperty({ description: 'Número', example: 123, required: false })
  number?: number;

  @ApiProperty({ description: 'Complemento', example: 'Apto 101', required: false })
  complement?: string;

  @ApiProperty({ description: 'ID da cidade', example: 1, required: false })
  idCity?: number;

  @ApiProperty({ description: 'ID do estado', example: 1, required: false })
  idState?: number;
}

