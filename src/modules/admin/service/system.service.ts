import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';

@Injectable()
export class SystemService {
  constructor(private prisma: PrismaService) {}

  async create(createSystemDto: CreateSystemDto) {
    return this.prisma.admin.system.create({
      data: createSystemDto,
      include: {
        modules: true,
        sellers: true,
        owners: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [systems, total] = await Promise.all([
      this.prisma.admin.system.findMany({
        skip,
        take: limit,
        include: {
          modules: true,
          sellers: true,
          owners: true,
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.admin.system.count(),
    ]);

    return {
      data: systems,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const system = await this.prisma.admin.system.findUnique({
      where: { id },
      include: {
        modules: true,
        sellers: true,
        owners: true,
      },
    });

    if (!system) {
      throw new NotFoundException(`System with ID ${id} not found`);
    }

    return system;
  }

  async update(id: number, updateSystemDto: UpdateSystemDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.admin.system.update({
      where: { id },
      data: updateSystemDto,
      include: {
        modules: true,
        sellers: true,
        owners: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.admin.system.delete({
      where: { id },
    });
  }
}

