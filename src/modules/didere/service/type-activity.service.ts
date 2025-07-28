import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';

export interface CreateTypeActivityDto {
  name: string;
}

export interface UpdateTypeActivityDto {
  name?: string;
}

@Injectable()
export class TypeActivityService {
  constructor(private prisma: PrismaService) {}

  async create(createTypeActivityDto: CreateTypeActivityDto) {
    return this.prisma.didere.typeActivity.create({
      data: createTypeActivityDto,
    });
  }

  async findAll() {
    return this.prisma.didere.typeActivity.findMany({
      include: {
        propertyTypeActivities: {
          include: {
            property: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.didere.typeActivity.findUnique({
      where: { id },
      include: {
        propertyTypeActivities: {
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

  async update(id: number, updateTypeActivityDto: UpdateTypeActivityDto) {
    return this.prisma.didere.typeActivity.update({
      where: { id },
      data: updateTypeActivityDto,
    });
  }

  async remove(id: number) {
    return this.prisma.didere.typeActivity.delete({
      where: { id },
    });
  }

  async search(name: string) {
    return this.prisma.didere.typeActivity.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}


