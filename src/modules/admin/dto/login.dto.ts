import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Login/email do usuário', example: 'joao@email.com' })
  login: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
  password: string;
}

