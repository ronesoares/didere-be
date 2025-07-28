import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto) {
    return this.prisma.didere.address.create({
      data: createAddressDto,
      include: {
        city: true,
        state: true,
        locators: true,
        properties: true,
        tenants: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [addresses, total] = await Promise.all([
      this.prisma.didere.address.findMany({
        skip,
        take: limit,
        include: {
          city: true,
          state: true,
          locators: true,
          properties: true,
          tenants: true,
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.didere.address.count(),
    ]);

    return {
      data: addresses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const address = await this.prisma.didere.address.findUnique({
      where: { id },
      include: {
        city: true,
        state: true,
        locators: true,
        properties: true,
        tenants: true,
      },
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.didere.address.update({
      where: { id },
      data: updateAddressDto,
      include: {
        city: true,
        state: true,
        locators: true,
        properties: true,
        tenants: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.didere.address.delete({
      where: { id },
    });
  }
}

