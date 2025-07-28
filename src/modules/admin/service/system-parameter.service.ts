import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateSystemParameterDto } from '../dto/create-system-parameter.dto';
import { UpdateSystemParameterDto } from '../dto/update-system-parameter.dto';

@Injectable()
export class SystemParameterService {
  constructor(private prisma: PrismaService) {}

  async create(createSystemParameterDto: CreateSystemParameterDto) {
    return this.prisma.admin.systemParameter.create({
      data: createSystemParameterDto,
    });
  }

  async findAll() {
    return this.prisma.admin.systemParameter.findMany();
  }

  async findOne(id: number) {
    return this.prisma.admin.systemParameter.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return this.prisma.admin.systemParameter.findFirst({
      where: { name },
    });
  }

  async update(id: number, updateSystemParameterDto: UpdateSystemParameterDto) {
    return this.prisma.admin.systemParameter.update({
      where: { id },
      data: updateSystemParameterDto,
    });
  }

  async remove(id: number) {
    return this.prisma.admin.systemParameter.delete({
      where: { id },
    });
  }
}

