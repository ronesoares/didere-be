import { ApiProperty } from '@nestjs/swagger';

export class CreateClaimFormDto {
  @ApiProperty({ description: 'Nome do interessado', example: 'João Silva' })
  name: string;

  @ApiProperty({ description: 'Número de telefone', example: '11999999999' })
  phoneNumber: string;

  @ApiProperty({ description: 'Email do interessado', example: 'joao@email.com' })
  email: string;

  @ApiProperty({ description: 'Mensagem detalhada', example: 'Tenho interesse no imóvel...' })
  messageDetail: string;

  @ApiProperty({ description: 'Origem do interesse', example: 'WEBSITE', enum: ['WEBSITE', 'MOBILE', 'PHONE', 'EMAIL'] })
  source?: string;

  @ApiProperty({ description: 'ID da propriedade', example: 1, required: false })
  idProperty?: number;
}

