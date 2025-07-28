import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva', required: false })
  name?: string;

  @ApiProperty({ description: 'Login/email do usuário', example: 'joao@email.com', required: false })
  login?: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'senha123', required: false })
  password?: string;

  @ApiProperty({ description: 'Status do usuário', example: 'A', enum: ['A', 'I'], required: false })
  status?: string;

  @ApiProperty({ description: 'Se é usuário proprietário', example: 'N', enum: ['Y', 'N'], required: false })
  isUserOwner?: string;

  @ApiProperty({ description: 'ID do perfil', example: 1, required: false })
  idProfile?: number;

  @ApiProperty({ description: 'ID do proprietário', example: 1, required: false })
  idOwner?: number;

  @ApiProperty({ description: 'ID do usuário que registrou', example: 1, required: false })
  idUserRegistration?: number;

  @ApiProperty({ description: 'ID do usuário que atualizou', example: 1, required: false })
  idUserLastUpdated?: number;
}

