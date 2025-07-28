import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreatePropertyRentalPeriodDto } from '../dto/create-property-rental-period.dto';

@Injectable()
export class PropertyRentalPeriodService {
  constructor(private prisma: PrismaService) {}

  async create(createPropertyRentalPeriodDto: CreatePropertyRentalPeriodDto) {
    return this.prisma.didere.propertyRentalPeriod.create({
      data: {
        idProperty: createPropertyRentalPeriodDto.idProperty,
        startDate: createPropertyRentalPeriodDto.startDate,
        endDate: createPropertyRentalPeriodDto.endDate,
        startHour: createPropertyRentalPeriodDto.startHour,
        endHour: createPropertyRentalPeriodDto.endHour,
        sunday: createPropertyRentalPeriodDto.sunday,
        monday: createPropertyRentalPeriodDto.monday,
        tuesday: createPropertyRentalPeriodDto.tuesday,
        wednesday: createPropertyRentalPeriodDto.wednesday,
        thursday: createPropertyRentalPeriodDto.thursday,
        friday: createPropertyRentalPeriodDto.friday,
        saturday: createPropertyRentalPeriodDto.saturday,
      },
      include: {
        property: true,
      },
    });
  }

  async findAll() {
    return this.prisma.didere.propertyRentalPeriod.findMany({
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

  async findOne(id: number) {
    return this.prisma.didere.propertyRentalPeriod.findUnique({
      where: { id },
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

  async findByProperty(idProperty: number) {
    return this.prisma.didere.propertyRentalPeriod.findMany({
      where: { idProperty },
      include: {
        property: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    });
  }

  async update(id: number, updatePropertyRentalPeriodDto: any) {
    return this.prisma.didere.propertyRentalPeriod.update({
      where: { id },
      data: {
        idProperty: updatePropertyRentalPeriodDto.idProperty,
        startDate: updatePropertyRentalPeriodDto.startDate,
        endDate: updatePropertyRentalPeriodDto.endDate,
        startHour: updatePropertyRentalPeriodDto.startHour,
        endHour: updatePropertyRentalPeriodDto.endHour,
        sunday: updatePropertyRentalPeriodDto.sunday,
        monday: updatePropertyRentalPeriodDto.monday,
        tuesday: updatePropertyRentalPeriodDto.tuesday,
        wednesday: updatePropertyRentalPeriodDto.wednesday,
        thursday: updatePropertyRentalPeriodDto.thursday,
        friday: updatePropertyRentalPeriodDto.friday,
        saturday: updatePropertyRentalPeriodDto.saturday,
      },
      include: {
        property: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.didere.propertyRentalPeriod.delete({
      where: { id },
    });
  }

  async createMultiple(idProperty: number, periods: CreatePropertyRentalPeriodDto[]) {
    const data = periods.map(period => ({
      ...period,
      idProperty,
    }));

    return this.prisma.didere.propertyRentalPeriod.createMany({
      data,
    });
  }

  async removeByProperty(idProperty: number) {
    return this.prisma.didere.propertyRentalPeriod.deleteMany({
      where: { idProperty },
    });
  }
}


