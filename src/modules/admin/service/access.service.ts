import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateAccessDto } from '../dto/create-access.dto';
import { UpdateAccessDto } from '../dto/update-access.dto';

@Injectable()
export class AccessService {
  constructor(private prisma: PrismaService) {}

  async create(createAccessDto: CreateAccessDto) {
    return this.prisma.admin.access.create({
      data: createAccessDto,
      include: {
        module: true,
        profile: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [accesses, total] = await Promise.all([
      this.prisma.admin.access.findMany({
        skip,
        take: limit,
        include: {
          module: true,
          profile: true,
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.admin.access.count(),
    ]);

    return {
      data: accesses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const access = await this.prisma.admin.access.findUnique({
      where: { id },
      include: {
        module: true,
        profile: true,
      },
    });

    if (!access) {
      throw new NotFoundException(`Access with ID ${id} not found`);
    }

    return access;
  }

  async update(id: number, updateAccessDto: UpdateAccessDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.admin.access.update({
      where: { id },
      data: updateAccessDto,
      include: {
        module: true,
        profile: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.admin.access.delete({
      where: { id },
    });
  }
}

