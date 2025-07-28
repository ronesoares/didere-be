import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import { UpdateOwnerDto } from '../dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(private prisma: PrismaService) {}

  async create(createOwnerDto: CreateOwnerDto) {
    return this.prisma.admin.owner.create({
      data: createOwnerDto,
      include: {
        system: true,
        seller: true,
        profiles: true,
        users: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [owners, total] = await Promise.all([
      this.prisma.admin.owner.findMany({
        skip,
        take: limit,
        include: {
          system: true,
          seller: true,
          profiles: true,
          users: true,
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.admin.owner.count(),
    ]);

    return {
      data: owners,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const owner = await this.prisma.admin.owner.findUnique({
      where: { id },
      include: {
        system: true,
        seller: true,
        profiles: true,
        users: true,
      },
    });

    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.admin.owner.update({
      where: { id },
      data: updateOwnerDto,
      include: {
        system: true,
        seller: true,
        profiles: true,
        users: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.admin.owner.delete({
      where: { id },
    });
  }
}

