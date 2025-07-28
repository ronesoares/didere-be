import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreatePropertyFeatureDto } from '../dto/create-property-feature.dto';

@Injectable()
export class PropertyFeatureService {
  constructor(private prisma: PrismaService) {}

  async create(createPropertyFeatureDto: CreatePropertyFeatureDto) {
    return this.prisma.didere.propertyFeature.create({
      data: {
        idProperty: createPropertyFeatureDto.idProperty,
        idFeature: createPropertyFeatureDto.idFeature,
      },
      include: {
        property: true,
        feature: true,
      },
    });
  }

  async findAll() {
    return this.prisma.didere.propertyFeature.findMany({
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
        feature: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.didere.propertyFeature.findUnique({
      where: { id },
      include: {
        property: true,
        feature: true,
      },
    });
  }

  async findByProperty(idProperty: number) {
    return this.prisma.didere.propertyFeature.findMany({
      where: { idProperty },
      include: {
        feature: true,
      },
    });
  }

  async findByFeature(idFeature: number) {
    return this.prisma.didere.propertyFeature.findMany({
      where: { idFeature },
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
    return this.prisma.didere.propertyFeature.delete({
      where: { id },
    });
  }

  async removeByPropertyAndFeature(idProperty: number, idFeature: number) {
    return this.prisma.didere.propertyFeature.deleteMany({
      where: {
        idProperty,
        idFeature,
      },
    });
  }

  async createMultiple(idProperty: number, idFeatures: number[]) {
    const data = idFeatures.map(idFeature => ({
      idProperty,
      idFeature,
    }));

    return this.prisma.didere.propertyFeature.createMany({
      data,
    });
  }

  async removeByProperty(idProperty: number) {
    return this.prisma.didere.propertyFeature.deleteMany({
      where: { idProperty },
    });
  }
}


