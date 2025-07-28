import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreatePropertyRentalPeriodDto } from '../dto/create-property-rental-period.dto';

@Injectable()
export class PropertyRentalPeriodService {
  constructor(private prisma: PrismaService) {}

  async create(propertyId: number, createPropertyRentalPeriodDto: CreatePropertyRentalPeriodDto) {
    return this.prisma.didere.propertyRentalPeriod.create({
      data: {
        idProperty: propertyId,
        startDate: new Date(createPropertyRentalPeriodDto.startDate),
        endDate: new Date(createPropertyRentalPeriodDto.endDate),
        startHour: createPropertyRentalPeriodDto.startHour || '00:00',
        endHour: createPropertyRentalPeriodDto.endHour || '23:59',
        sunday: createPropertyRentalPeriodDto.sunday || 'Y',
        monday: createPropertyRentalPeriodDto.monday || 'Y',
        tuesday: createPropertyRentalPeriodDto.tuesday || 'Y',
        wednesday: createPropertyRentalPeriodDto.wednesday || 'Y',
        thursday: createPropertyRentalPeriodDto.thursday || 'Y',
        friday: createPropertyRentalPeriodDto.friday || 'Y',
        saturday: createPropertyRentalPeriodDto.saturday || 'Y',
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
        startDate: updatePropertyRentalPeriodDto.startDate ? new Date(updatePropertyRentalPeriodDto.startDate) : undefined,
        endDate: updatePropertyRentalPeriodDto.endDate ? new Date(updatePropertyRentalPeriodDto.endDate) : undefined,
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
      idProperty,
      startDate: new Date(period.startDate),
      endDate: new Date(period.endDate),
      startHour: period.startHour || '00:00',
      endHour: period.endHour || '23:59',
      sunday: period.sunday || 'Y',
      monday: period.monday || 'Y',
      tuesday: period.tuesday || 'Y',
      wednesday: period.wednesday || 'Y',
      thursday: period.thursday || 'Y',
      friday: period.friday || 'Y',
      saturday: period.saturday || 'Y',
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

