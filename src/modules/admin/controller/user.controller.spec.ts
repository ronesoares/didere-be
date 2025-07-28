import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        name: 'Test User',
        login: 'test@example.com',
        password: 'password123',
        status: 'A',
        isUserOwner: 'N',
        idProfile: 1,
        idOwner: 1,
      };
      const createdUser = { id: 1, ...createUserDto };

      mockUserService.create.mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);

      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const paginatedResult = {
        data: [
          { id: 1, name: 'User 1', login: 'user1@example.com' },
          { id: 2, name: 'User 2', login: 'user2@example.com' },
        ],
        meta: { total: 2, page: 1, limit: 10, totalPages: 1 },
      };

      mockUserService.findAll.mockResolvedValue(paginatedResult);

      const result = await controller.findAll();

      expect(mockUserService.findAll).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual(paginatedResult);
    });

    it('should use default pagination values', async () => {
      const paginatedResult = {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      };

      mockUserService.findAll.mockResolvedValue(paginatedResult);

      const result = await controller.findAll();

      expect(mockUserService.findAll).toHaveBeenCalledWith(undefined, undefined);
      expect(result).toEqual(paginatedResult);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, name: 'Test User', login: 'test@example.com' };
      mockUserService.findOne.mockResolvedValue(user);

      const result = await controller.findOne(1);

      expect(mockUserService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { name: 'Updated User' };
      const updatedUser = { id: 1, name: 'Updated User', login: 'test@example.com' };

      mockUserService.update.mockResolvedValue(updatedUser);

      const result = await controller.update(1, updateUserDto);

      expect(mockUserService.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const deletedUser = { id: 1, name: 'Test User', login: 'test@example.com' };
      mockUserService.remove.mockResolvedValue(deletedUser);

      const result = await controller.remove(1);

      expect(mockUserService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deletedUser);
    });
  });
});

