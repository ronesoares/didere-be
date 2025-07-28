import { ApiProperty } from '@nestjs/swagger';

export class CreateLocatorDto {
  @ApiProperty({ description: 'Nome do locador', example: 'João Silva' })
  name: string;

  @ApiProperty({ description: 'Apelido', example: 'João', required: false })
  nickname?: string;

  @ApiProperty({ description: 'Telefone principal', example: '11999999999', required: false })
  phoneOption1?: string;

  @ApiProperty({ description: 'Telefone secundário', example: '11888888888', required: false })
  phoneOption2?: string;

  @ApiProperty({ description: 'Email', example: 'joao@email.com' })
  email: string;

  @ApiProperty({ description: 'Documento (CPF/CNPJ)', example: '12345678901', required: false })
  document?: string;

  @ApiProperty({ description: 'Data de nascimento', example: '1980-01-01', required: false })
  birthday?: Date;

  @ApiProperty({ description: 'ID do endereço', example: 1, required: false })
  idAddress?: number;
}

