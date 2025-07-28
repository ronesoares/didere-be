import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileDto {
  @ApiProperty({ description: 'Nome do arquivo', example: 'documento.pdf', required: false })
  name?: string;

  @ApiProperty({ description: 'Tipo do arquivo', example: 'pdf', required: false })
  type?: string;

  @ApiProperty({ description: 'Tamanho do arquivo em bytes', example: 1024.50, required: false })
  size?: number;

  @ApiProperty({ description: 'ID do módulo', example: 1, required: false })
  idModule?: number;

  @ApiProperty({ description: 'ID da chave do módulo', example: 1, required: false })
  idKeyModule?: number;

  @ApiProperty({ description: 'ID do proprietário', example: 1, required: false })
  idOwner?: number;

  @ApiProperty({ description: 'ID do sistema', example: 1, required: false })
  idSystem?: number;

  @ApiProperty({ description: 'ID do usuário que criou', example: 1, required: false })
  idCreationUser?: number;
}

