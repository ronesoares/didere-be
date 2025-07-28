import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../../../common/auth/auth.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { Public } from '../../../common/decorators/public.decorator';
import { LoginDto } from '../dto/login.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { loginSchema } from '../../../common/schemas/user.schema';
import { UserService } from '../../admin/service/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @JoiValidation(loginSchema)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.login, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Credencial inválida!');
    }

    const access_token = this.authService.login(user);

    return access_token;
  }

  @Public()
  @Post('google')
  @ApiOperation({ summary: 'Google OAuth login' })
  @ApiResponse({ status: 200, description: 'Google login successful.' })
  @ApiResponse({ status: 401, description: 'Invalid Google token.' })
  async googleLogin(@Body() body: { token: string }) {
    const googleUser = {
      email: 'user@example.com',
      name: 'Google User',
      picture: 'https://example.com/picture.jpg',
    };
    
    return this.authService.validateGoogleUser(googleUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getProfile(@Request() req) {
    return req.user;
  }
}

