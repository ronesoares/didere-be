import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Controllers
import { UserController } from './controller/user.controller';
import { OwnerController } from './controller/owner.controller';
import { SellerController } from './controller/seller.controller';
import { ModuleController } from './controller/module.controller';
import { SystemController } from './controller/system.controller';
import { AccessController } from './controller/access.controller';
import { AuthController } from './controller/auth.controller';

// Services
import { UserService } from './service/user.service';
import { ProfileService } from './service/profile.service';
import { SystemParameterService } from './service/system-parameter.service';
import { OwnerService } from './service/owner.service';
import { SellerService } from './service/seller.service';
import { ModuleService } from './service/module.service';
import { SystemService } from './service/system.service';
import { AccessService } from './service/access.service';
import { PrismaService } from '../../common/service/prisma.service';

// Auth
import { AuthService } from '../../common/auth/auth.service';
import { JwtStrategy } from '../../common/auth/jwt.strategy';
import { LocalStrategy } from '../../common/auth/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    UserController,
    OwnerController,
    SellerController,
    ModuleController,
    SystemController,
    AccessController,
    AuthController,
  ],
  providers: [
    UserService,
    ProfileService,
    SystemParameterService,
    OwnerService,
    SellerService,
    ModuleService,
    SystemService,
    AccessService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    PrismaService,
  ],
  exports: [
    UserService,
    ProfileService,
    SystemParameterService,
    OwnerService,
    SellerService,
    ModuleService,
    SystemService,
    AccessService,
    AuthService,
  ],
})
export class AdminModule {}