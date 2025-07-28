import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ description: 'Nome do perfil', example: 'Administrador' })
  name: string;

  @ApiProperty({ description: 'ID do proprietário', example: 1, required: false })
  idOwner?: number;

  @ApiProperty({ description: 'ID do usuário que registrou', example: 1, required: false })
  idUserRegistration?: number;

  @ApiProperty({ description: 'ID do usuário que atualizou', example: 1, required: false })
  idUserLastUpdated?: number;
}

