import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PrismaService } from '../../../common/service/prisma.service';
import { mockPrismaService } from '../../../test/setup';

describe('PropertyService', () => {
  let service: PropertyService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a property successfully', async () => {
      const createPropertyDto = {
        title: 'A test property', 
        height: 0, 
        width: 0, 
        depth: 0, 
        value: 1000,
        description: 'A test property',
        idLocator: 1,
        idAddress: 1,
      };
      const createdProperty = { id: 1, ...createPropertyDto };

      mockPrismaService.didere.property.create.mockResolvedValue(createdProperty);

      const result = await service.create(createPropertyDto);

      expect(mockPrismaService.didere.property.create).toHaveBeenCalledWith({
        data: createPropertyDto,
        include: {
          locator: true,
          address: {
            include: {
              city: {
                include: {
                  state: true,
                },
              },
            },
          },
          propertyRentalPeriods: true,
          propertyFeatures: {
            include: {
              feature: true,
            },
          },
          propertyTypeActivities: {
            include: {
              typeActivity: true,
            },
          },
        },
      });
      expect(result).toEqual(createdProperty);
    });
  });

  describe('findAll', () => {
    it('should return paginated properties', async () => {
      const properties = [
        { id: 1, description: 'Property 1', value: 1000 },
        { id: 2, description: 'Property 2', value: 2000 },
      ];
      const total = 2;

      mockPrismaService.didere.property.findMany.mockResolvedValue(properties);
      mockPrismaService.didere.property.count.mockResolvedValue(total);

      const result = await service.findAll();

      expect(mockPrismaService.didere.property.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        include: {
          locator: true,
          address: {
            include: {
              city: {
                include: {
                  state: true,
                },
              },
            },
          },
          propertyRentalPeriods: true,
          propertyFeatures: {
            include: {
              feature: true,
            },
          },
          propertyTypeActivities: {
            include: {
              typeActivity: true,
            },
          },
        },
        orderBy: { id: 'desc' },
      });
      expect(result).toEqual(properties);
      expect(result).toEqual({
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });

    it('should use default pagination values', async () => {
      const properties = [];
      const total = 0;

      mockPrismaService.didere.property.findMany.mockResolvedValue(properties);
      mockPrismaService.didere.property.count.mockResolvedValue(total);

      const result = await service.findAll();

      expect(mockPrismaService.didere.property.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        include: expect.any(Object),
        orderBy: { id: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a property by id', async () => {
      const property = { id: 1, name: 'Test Property', value: 1000 };
      mockPrismaService.didere.property.findUnique.mockResolvedValue(property);

      const result = await service.findOne(1);

      expect(mockPrismaService.didere.property.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          locator: true,
          address: {
            include: {
              city: {
                include: {
                  state: true,
                },
              },
            },
          },
          propertyRentalPeriods: true,
          propertyFeatures: {
            include: {
              feature: true,
            },
          },
          propertyTypeActivities: {
            include: {
              typeActivity: true,
            },
          },
        },
      });
      expect(result).toEqual(property);
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPrismaService.didere.property.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a property successfully', async () => {
      const existingProperty = { id: 1, description: 'Old Property', value: 1000 };
      const updateDto = { description: 'Updated Property', value: 1500 };
      const updatedProperty = { ...existingProperty, ...updateDto };

      mockPrismaService.didere.property.findUnique.mockResolvedValue(existingProperty);
      mockPrismaService.didere.property.update.mockResolvedValue(updatedProperty);

      const result = await service.update(1, updateDto);

      expect(mockPrismaService.didere.property.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
        include: {
          locator: true,
          address: {
            include: {
              city: {
                include: {
                  state: true,
                },
              },
            },
          },
          propertyRentalPeriods: true,
          propertyFeatures: {
            include: {
              feature: true,
            },
          },
          propertyTypeActivities: {
            include: {
              typeActivity: true,
            },
          },
        },
      });
      expect(result).toEqual(updatedProperty);
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPrismaService.didere.property.findUnique.mockResolvedValue(null);

      await expect(service.update(999, { description: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a property successfully', async () => {
      const existingProperty = { id: 1, description: 'Test Property' };
      mockPrismaService.didere.property.findUnique.mockResolvedValue(existingProperty);
      mockPrismaService.didere.property.delete.mockResolvedValue(existingProperty);

      const result = await service.remove(1);

      expect(mockPrismaService.didere.property.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(existingProperty);
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPrismaService.didere.property.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});

