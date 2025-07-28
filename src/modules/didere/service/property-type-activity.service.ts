import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreatePropertyTypeActivityDto } from '../dto/create-property-type-activity.dto';

@Injectable()
export class PropertyTypeActivityService {
  constructor(private prisma: PrismaService) {}

  async create(createPropertyTypeActivityDto: CreatePropertyTypeActivityDto) {
    return this.prisma.didere.propertyTypeActivity.create({
      data: {
        idProperty: createPropertyTypeActivityDto.idProperty,
        idTypeActivity: createPropertyTypeActivityDto.idTypeActivity,
      },
      include: {
        property: true,
        typeActivity: true,
      },
    });
  }

  async findAll() {
    return this.prisma.didere.propertyTypeActivity.findMany({
      include: {
        property: {
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
          },
        },
        typeActivity: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.didere.propertyTypeActivity.findUnique({
      where: { id },
      include: {
        property: true,
        typeActivity: true,
      },
    });
  }

  async findByProperty(idProperty: number) {
    return this.prisma.didere.propertyTypeActivity.findMany({
      where: { idProperty },
      include: {
        typeActivity: true,
      },
    });
  }

  async findByTypeActivity(idTypeActivity: number) {
    return this.prisma.didere.propertyTypeActivity.findMany({
      where: { idTypeActivity },
      include: {
        property: {
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
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.didere.propertyTypeActivity.delete({
      where: { id },
    });
  }

  async removeByPropertyAndTypeActivity(idProperty: number, idTypeActivity: number) {
    return this.prisma.didere.propertyTypeActivity.deleteMany({
      where: {
        idProperty,
        idTypeActivity,
      },
    });
  }

  async createMultiple(idProperty: number, idTypeActivities: number[]) {
    const data = idTypeActivities.map(idTypeActivity => ({
      idProperty,
      idTypeActivity,
    }));

    return this.prisma.didere.propertyTypeActivity.createMany({
      data,
    });
  }

  async removeByProperty(idProperty: number) {
    return this.prisma.didere.propertyTypeActivity.deleteMany({
      where: { idProperty },
    });
  }
}


