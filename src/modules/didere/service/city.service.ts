import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto) {
    // Check if city ID already exists
    const existingCity = await this.prisma.didere.city.findUnique({
      where: { id: createCityDto.id },
    });

    if (existingCity) {
      throw new ConflictException(`City with ID ${createCityDto.id} already exists`);
    }

    return this.prisma.didere.city.create({
      data: createCityDto,
      include: {
        state: true,
        addresses: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10, idState?: number) {
    const skip = (page - 1) * limit;
    
    const where = idState ? { idState } : {};
    
    const [cities, total] = await Promise.all([
      this.prisma.didere.city.findMany({
        skip,
        take: limit,
        where,
        include: {
          state: true,
          addresses: true,
        },
        orderBy: { name: 'asc' },
      }),
      this.prisma.didere.city.count({ where }),
    ]);

    return {
      data: cities,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const city = await this.prisma.didere.city.findUnique({
      where: { id },
      include: {
        state: true,
        addresses: true,
      },
    });

    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }

    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.didere.city.update({
      where: { id },
      data: updateCityDto,
      include: {
        state: true,
        addresses: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.didere.city.delete({
      where: { id },
    });
  }
}

