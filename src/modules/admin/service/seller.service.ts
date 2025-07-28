import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateSellerDto } from '../dto/create-seller.dto';
import { UpdateSellerDto } from '../dto/update-seller.dto';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  async create(createSellerDto: CreateSellerDto) {
    // Check if token already exists
    const existingSeller = await this.prisma.admin.seller.findUnique({
      where: { token: createSellerDto.token },
    });

    if (existingSeller) {
      throw new ConflictException(`Seller with token ${createSellerDto.token} already exists`);
    }

    return this.prisma.admin.seller.create({
      data: createSellerDto,
      include: {
        system: true,
        owners: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [sellers, total] = await Promise.all([
      this.prisma.admin.seller.findMany({
        skip,
        take: limit,
        include: {
          system: true,
          owners: true,
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.admin.seller.count(),
    ]);

    return {
      data: sellers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const seller = await this.prisma.admin.seller.findUnique({
      where: { id },
      include: {
        system: true,
        owners: true,
      },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }

    return seller;
  }

  async update(id: number, updateSellerDto: UpdateSellerDto) {
    await this.findOne(id); // Check if exists

    // Check if token already exists (if updating token)
    if (updateSellerDto.token) {
      const existingSeller = await this.prisma.admin.seller.findUnique({
        where: { token: updateSellerDto.token },
      });

      if (existingSeller && existingSeller.id !== id) {
        throw new ConflictException(`Seller with token ${updateSellerDto.token} already exists`);
      }
    }

    return this.prisma.admin.seller.update({
      where: { id },
      data: updateSellerDto,
      include: {
        system: true,
        owners: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.admin.seller.delete({
      where: { id },
    });
  }
}

