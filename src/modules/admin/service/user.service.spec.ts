import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../../../common/service/prisma.service';
import { mockPrismaService } from '../../../test/setup';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createUserDto = {
      name: 'Test User',
      login: 'test@example.com',
      password: 'password123',
      status: 'A',
      isUserOwner: 'N',
      idProfile: 1,
      idOwner: 1,
    };

    it('should create a user successfully', async () => {
      const hashedPassword = 'hashedPassword123';
      const createdUser = { id: 1, ...createUserDto, password: hashedPassword };

      mockPrismaService.admin.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.admin.user.create.mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(mockPrismaService.admin.user.findUnique).toHaveBeenCalledWith({
        where: { email: createUserDto.login },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(mockPrismaService.admin.user.create).toHaveBeenCalledWith({
        data: { ...createUserDto, password: hashedPassword },
        include: { profile: true, owner: true },
      });
      expect(result).toEqual(createdUser);
    });

    it('should throw ConflictException if email already exists', async () => {
      const existingUser = { id: 1, login: createUserDto.login, name: '', status: 'A', isUserOwner: false, idProfile: 1, idOwner: 2, };
      mockPrismaService.admin.user.findUnique.mockResolvedValue(existingUser);

      await expect(service.create(createUserDto)).rejects.toThrow(ConflictException);
      expect(mockPrismaService.admin.user.findUnique).toHaveBeenCalledWith({
        where: { email: createUserDto.login },
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated users without passwords', async () => {
      const users = [
        { id: 1, name: 'User 1', login: 'user1@example.com', password: 'hash1' },
        { id: 2, name: 'User 2', login: 'user2@example.com', password: 'hash2' },
      ];
      const total = 2;

      mockPrismaService.admin.user.findMany.mockResolvedValue(users);
      mockPrismaService.admin.user.count.mockResolvedValue(total);

      const result = await service.findAll(1, 10);

      expect(result.data).toHaveLength(2);
      expect(result.data[0]).not.toHaveProperty('password');
      expect(result.data[1]).not.toHaveProperty('password');
      expect(result.meta).toEqual({
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });
  });

  describe('findOne', () => {
    it('should return user without password', async () => {
      const user = { id: 1, name: 'Test User', login: 'test@example.com', password: 'hash' };
      mockPrismaService.admin.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(result).not.toHaveProperty('password');
      expect(result.id).toBe(1);
      expect(result.name).toBe('Test User');
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrismaService.admin.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return user with password for authentication', async () => {
      const user = { id: 1, name: 'Test User', login: 'test@example.com', password: 'hash' };
      mockPrismaService.admin.user.findUnique.mockResolvedValue(user);

      const result = await service.findByLogin('test@example.com');

      expect(result).toEqual(user);
      expect(result.password).toBe('hash');
    });
  });

  describe('createFromGoogle', () => {
    it('should create user from Google OAuth data', async () => {
      const googleUser = {
        login: 'google@example.com',
        name: 'Google User',
        picture: 'https://example.com/picture.jpg',
      };
      const hashedPassword = 'hashedRandomPassword';
      const createdUser = { id: 1, ...googleUser, password: hashedPassword };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.admin.user.create.mockResolvedValue(createdUser);

      const result = await service.createFromGoogle(googleUser);

      expect(bcrypt.hash).toHaveBeenCalled();
      expect(mockPrismaService.admin.user.create).toHaveBeenCalledWith({
        data: {
          login: googleUser.login,
          name: googleUser.name,
          password: hashedPassword,
          status: 'A',
          isUserOwner: 'N',
          idProfile: 1,
          idOwner: 1,
        },
        include: { profile: true, owner: true },
      });
      expect(result).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update user and hash password if provided', async () => {
      const existingUser = { id: 1, name: 'Old Name', password: 'oldHash' };
      const updateDto = { name: 'New Name', password: 'newPassword' };
      const hashedPassword = 'newHashedPassword';
      const updatedUser = { ...existingUser, ...updateDto, password: hashedPassword };

      mockPrismaService.admin.user.findUnique.mockResolvedValue(existingUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.admin.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
      expect(mockPrismaService.admin.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { ...updateDto, password: hashedPassword },
        include: { profile: true, owner: true },
      });
      expect(result).not.toHaveProperty('password');
    });

    it('should update user without hashing password if not provided', async () => {
      const existingUser = { id: 1, name: 'Old Name', password: 'oldHash' };
      const updateDto = { name: 'New Name' };
      const updatedUser = { ...existingUser, ...updateDto };

      mockPrismaService.admin.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.admin.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateDto);

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockPrismaService.admin.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
        include: { profile: true, owner: true },
      });
      expect(result).not.toHaveProperty('password');
    });
  });

  describe('remove', () => {
    it('should delete user successfully', async () => {
      const existingUser = { id: 1, name: 'Test User' };
      mockPrismaService.admin.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.admin.user.delete.mockResolvedValue(existingUser);

      const result = await service.remove(1);

      expect(mockPrismaService.admin.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(existingUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrismaService.admin.user.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});

