import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateLocatorDto } from '../dto/create-locator.dto';

@Injectable()
export class LocatorService {
  constructor(private prisma: PrismaService) {}

  async create(createLocatorDto: CreateLocatorDto) {
    return this.prisma.didere.locator.create({
      data: {
        name: createLocatorDto.name,
        nickname: createLocatorDto.nickname,
        phoneOption1: createLocatorDto.phoneOption1,
        phoneOption2: createLocatorDto.phoneOption2,
        email: createLocatorDto.email,
        document: createLocatorDto.document,
        birthday: createLocatorDto.birthday,
        address: createLocatorDto.idAddress ? {
          connect: { id: createLocatorDto.idAddress }
        } : undefined,
      },
      include: {
        address: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        properties: true,
      },
    });
  }

  async findAll() {
    return this.prisma.didere.locator.findMany({
      include: {
        address: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        properties: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.didere.locator.findUnique({
      where: { id },
      include: {
        address: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        properties: {
          include: {
            address: {
              include: {
                city: {
                  include: {
                    state: true,
                  },
                },
              },
            },
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
            propertyRentalPeriods: true,
          },
        },
      },
    });
  }

  async update(id: number, updateLocatorDto: any) {
    return this.prisma.didere.locator.update({
      where: { id },
      data: {
        name: updateLocatorDto.name,
        nickname: updateLocatorDto.nickname,
        phoneOption1: updateLocatorDto.phoneOption1,
        phoneOption2: updateLocatorDto.phoneOption2,
        email: updateLocatorDto.email,
        document: updateLocatorDto.document,
        birthday: updateLocatorDto.birthday,
        address: updateLocatorDto.idAddress ? {
          connect: { id: updateLocatorDto.idAddress }
        } : undefined,
      },
      include: {
        address: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        properties: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.didere.locator.delete({
      where: { id },
    });
  }
}

