import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ description: 'CEP', example: '01234-567' })
  zipCode: string;

  @ApiProperty({ description: 'Nome da rua/avenida', example: 'Rua das Flores' })
  name: string;

  @ApiProperty({ description: 'Bairro', example: 'Centro' })
  neighborhood: string;

  @ApiProperty({ description: 'Número', example: 123, required: false })
  number?: number;

  @ApiProperty({ description: 'Complemento', example: 'Apto 101', required: false })
  complement?: string;

  @ApiProperty({ description: 'ID da cidade', example: 1 })
  idCity: number;

  @ApiProperty({ description: 'ID do estado', example: 1 })
  idState: number;
}

