import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({ description: 'Nome do arquivo', example: 'documento.pdf' })
  name: string;

  @ApiProperty({ description: 'Tipo do arquivo', example: 'pdf' })
  type: string;

  @ApiProperty({ description: 'Tamanho do arquivo em bytes', example: 1024.50 })
  size: number;

  @ApiProperty({ description: 'ID do módulo', example: 1 })
  idModule: number;

  @ApiProperty({ description: 'ID da chave do módulo', example: 1 })
  idKeyModule: number;

  @ApiProperty({ description: 'ID do proprietário', example: 1 })
  idOwner: number;

  @ApiProperty({ description: 'ID do sistema', example: 1 })
  idSystem: number;

  @ApiProperty({ description: 'ID do usuário que criou', example: 1 })
  idCreationUser: number;
}

