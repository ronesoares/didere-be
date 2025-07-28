import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../../modules/admin/service/user.service';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    findByEmail: jest.fn(),
    createFromGoogle: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user without password if credentials are valid', async () => {
      const user = {
        id: 1,
        login: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
      };
      const { password, ...userWithoutPassword } = user;

      mockUserService.findByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password123');

      expect(mockUserService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(result).toEqual(userWithoutPassword);
    });

    it('should return null if user not found', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password123');

      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const user = {
        id: 1,
        login: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
      };

      mockUserService.findByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'wrongPassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user data', async () => {
      const user = {
        id: 1,
        login: 'test@example.com',
        name: 'Test User',
        idProfile: 1,
        idOwner: 1,
      };
      const accessToken = 'jwt-token';

      mockJwtService.sign.mockReturnValue(accessToken);

      const result = await service.login(user);

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        login: user.login,
        sub: user.id,
        name: user.name,
        idProfile: user.idProfile,
        idOwner: user.idOwner,
      });
      expect(result).toEqual({
        access_token: accessToken,
        user: {
          id: user.id,
          login: user.login,
          name: user.name,
          idProfile: user.idProfile,
          idOwner: user.idOwner,
        },
      });
    });
  });

  describe('validateGoogleUser', () => {
    it('should create new user and return login data for new Google user', async () => {
      const googleUser = {
        login: 'google@example.com',
        name: 'Google User',
        idProfile: 1,
        idOwner: 2,
      };
      const createdUser = { id: 1, ...googleUser };
      const loginResult = {
        access_token: 'jwt-token',
        user: createdUser,
      };

      mockUserService.findByEmail.mockResolvedValue(null);
      mockUserService.createFromGoogle.mockResolvedValue(createdUser);
      jest.spyOn(service, 'login').mockResolvedValue(loginResult);

      const result = await service.validateGoogleUser(googleUser);

      expect(mockUserService.findByEmail).toHaveBeenCalledWith(googleUser.login);
      expect(mockUserService.createFromGoogle).toHaveBeenCalledWith(googleUser);
      expect(service.login).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(loginResult);
    });

    it('should return login data for existing Google user', async () => {
      const googleUser = {
        login: 'google@example.com',
        name: 'Google User',
        idProfile: 1,
        idOwner: 2,
      };
      const existingUser = { id: 1, ...googleUser };
      const loginResult = {
        access_token: 'jwt-token',
        user: existingUser,
      };

      mockUserService.findByEmail.mockResolvedValue(existingUser);
      jest.spyOn(service, 'login').mockResolvedValue(loginResult);

      const result = await service.validateGoogleUser(googleUser);

      expect(mockUserService.findByEmail).toHaveBeenCalledWith(googleUser.login);
      expect(mockUserService.createFromGoogle).not.toHaveBeenCalled();
      expect(service.login).toHaveBeenCalledWith(existingUser);
      expect(result).toEqual(loginResult);
    });
  });
});

