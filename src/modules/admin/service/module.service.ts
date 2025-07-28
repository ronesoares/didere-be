import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async create(createModuleDto: CreateModuleDto) {
    return this.prisma.admin.module.create({
      data: createModuleDto,
      include: {
        system: true,
        accesses: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [modules, total] = await Promise.all([
      this.prisma.admin.module.findMany({
        skip,
        take: limit,
        include: {
          system: true,
          accesses: true,
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.admin.module.count(),
    ]);

    return {
      data: modules,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const module = await this.prisma.admin.module.findUnique({
      where: { id },
      include: {
        system: true,
        accesses: true,
      },
    });

    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    return module;
  }

  async update(id: number, updateModuleDto: UpdateModuleDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.admin.module.update({
      where: { id },
      data: updateModuleDto,
      include: {
        system: true,
        accesses: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.admin.module.delete({
      where: { id },
    });
  }
}

