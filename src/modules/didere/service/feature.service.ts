import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';

export interface CreateFeatureDto {
  name: string;
  description: string;
}

export interface UpdateFeatureDto {
  name?: string;
  description?: string;
}

@Injectable()
export class FeatureService {
  constructor(private prisma: PrismaService) {}

  async create(createFeatureDto: CreateFeatureDto) {
    return this.prisma.didere.feature.create({
      data: createFeatureDto,
    });
  }

  async findAll() {
    return this.prisma.didere.feature.findMany({
      include: {
        propertyFeatures: {
          include: {
            property: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.didere.feature.findUnique({
      where: { id },
      include: {
        propertyFeatures: {
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
        },
      },
    });
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return this.prisma.didere.feature.update({
      where: { id },
      data: updateFeatureDto,
    });
  }

  async remove(id: number) {
    return this.prisma.didere.feature.delete({
      where: { id },
    });
  }

  async search(name: string) {
    return this.prisma.didere.feature.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}


