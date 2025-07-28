import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async create(createTenantDto: CreateTenantDto) {
    return this.prisma.didere.tenant.create({
      data: createTenantDto,
      include: {
        address: {
          include: {
            city: true,
            state: true,
          },
        },
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [tenants, total] = await Promise.all([
      this.prisma.didere.tenant.findMany({
        skip,
        take: limit,
        include: {
          address: {
            include: {
              city: true,
              state: true,
            },
          },
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.didere.tenant.count(),
    ]);

    return {
      data: tenants,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const tenant = await this.prisma.didere.tenant.findUnique({
      where: { id },
      include: {
        address: {
          include: {
            city: true,
            state: true,
          },
        },
      },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }

    return tenant;
  }

  async update(id: number, updateTenantDto: UpdateTenantDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.didere.tenant.update({
      where: { id },
      data: updateTenantDto,
      include: {
        address: {
          include: {
            city: true,
            state: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.didere.tenant.delete({
      where: { id },
    });
  }
}

