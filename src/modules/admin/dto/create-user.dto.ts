import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  name: string;

  @ApiProperty({ description: 'Login/email do usuário', example: 'joao@email.com' })
  login: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
  password: string;

  @ApiProperty({ description: 'Status do usuário', example: 'A', enum: ['A', 'I'] })
  status?: string;

  @ApiProperty({ description: 'Se é usuário proprietário', example: 'N', enum: ['Y', 'N'] })
  isUserOwner?: string;

  @ApiProperty({ description: 'ID do perfil', example: 1 })
  idProfile: number;

  @ApiProperty({ description: 'ID do proprietário', example: 1 })
  idOwner: number;

  @ApiProperty({ description: 'ID do usuário que registrou', example: 1, required: false })
  idUserRegistration?: number;

  @ApiProperty({ description: 'ID do usuário que atualizou', example: 1, required: false })
  idUserLastUpdated?: number;
}

