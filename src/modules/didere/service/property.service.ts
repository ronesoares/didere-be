import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto) {
    return this.prisma.didere.property.create({
      data: {
        idLocator: createPropertyDto.idLocator,
        title: createPropertyDto.title,
        description: createPropertyDto.description,
        idAddress: createPropertyDto.idAddress,
        height: createPropertyDto.height,
        width: createPropertyDto.width,
        depth: createPropertyDto.depth,
        mainPhoto: createPropertyDto.mainPhoto,
        periodicity: createPropertyDto.periodicity,
        value: createPropertyDto.value,
        urlMaps: createPropertyDto.urlMaps,
      },
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
    });
  }

  async findAll() {
    return this.prisma.didere.property.findMany({
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
    });
  }

  async findOne(id: number) {
    return this.prisma.didere.property.findUnique({
      where: { id },
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
        // propertyFiles: {
        //   include: {
        //     file: true,
        //   },
        // },
        // propertyPhotos: {
        //   include: {
        //     file: true,
        //   },
        // },
      },
    });
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.prisma.didere.property.update({
      where: { id },
      data: {
        idLocator: updatePropertyDto.idLocator,
        title: updatePropertyDto.title,
        description: updatePropertyDto.description,
        idAddress: updatePropertyDto.idAddress,
        height: updatePropertyDto.height,
        width: updatePropertyDto.width,
        depth: updatePropertyDto.depth,
        mainPhoto: updatePropertyDto.mainPhoto,
        periodicity: updatePropertyDto.periodicity,
        value: updatePropertyDto.value,
        urlMaps: updatePropertyDto.urlMaps,
      },
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
    });
  }

  async remove(id: number) {
    return this.prisma.didere.property.delete({
      where: { id },
    });
  }

  async search(filters: any) {
    const where: any = {};

    if (filters.city) {
      where.address = {
        city: {
          name: {
            contains: filters.city,
          },
        },
      };
    }

    if (filters.minValue) {
      where.value = {
        gte: parseFloat(filters.minValue),
      };
    }

    if (filters.maxValue) {
      where.value = {
        ...where.value,
        lte: parseFloat(filters.maxValue),
      };
    }

    if (filters.typeActivity) {
      where.propertyTypeActivities = {
        some: {
          typeActivity: {
            name: {
              contains: filters.typeActivity,
            },
          },
        },
      };
    }

    return this.prisma.didere.property.findMany({
      where,
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
    });
  }
}


