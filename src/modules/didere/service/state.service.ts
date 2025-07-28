import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateStateDto } from '../dto/create-state.dto';
import { UpdateStateDto } from '../dto/update-state.dto';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  async create(createStateDto: CreateStateDto) {
    // Check if state ID already exists
    const existingState = await this.prisma.didere.state.findUnique({
      where: { id: createStateDto.id },
    });

    if (existingState) {
      throw new ConflictException(`State with ID ${createStateDto.id} already exists`);
    }

    return this.prisma.didere.state.create({
      data: createStateDto,
      include: {
        cities: true,
        addresses: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [states, total] = await Promise.all([
      this.prisma.didere.state.findMany({
        skip,
        take: limit,
        include: {
          cities: true,
          addresses: true,
        },
        orderBy: { name: 'asc' },
      }),
      this.prisma.didere.state.count(),
    ]);

    return {
      data: states,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const state = await this.prisma.didere.state.findUnique({
      where: { id },
      include: {
        cities: true,
        addresses: true,
      },
    });

    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }

    return state;
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
    await this.findOne(id); // Check if exists

    return this.prisma.didere.state.update({
      where: { id },
      data: updateStateDto,
      include: {
        cities: true,
        addresses: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.didere.state.delete({
      where: { id },
    });
  }
}

