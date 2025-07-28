import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../modules/admin/service/user.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateMD5Hash(text: string): string {
    return crypto.createHash('md5').update(text).digest('hex');
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findByLogin(login);

    if (user) {
      const hashedPassword = this.generateMD5Hash(password).toUpperCase();
      
      if (hashedPassword === user.password) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.login, 
      sub: user.id,
      name: user.name,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        login: user.login,
        name: user.name,
      },
    };
  }

  async validateGoogleUser(googleUser: any) {
    const { login, name, picture } = googleUser;
    
    let user = await this.userService.findByLogin(login);
    
    if (!user) {
      // Create new user from Google OAuth
      user = await this.userService.createFromGoogle({
        login,
        name,
        picture,
      });
    }
    
    return this.login(user);
  }
}

