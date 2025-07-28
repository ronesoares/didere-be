import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    return this.prisma.admin.profile.create({
      data: {
        name: createProfileDto.name,
        owner: createProfileDto.idOwner ? {
          connect: { id: createProfileDto.idOwner }
        } : undefined,
        userRegistration: createProfileDto.idUserRegistration ? {
          connect: { id: createProfileDto.idUserRegistration }
        } : undefined,
        userLastUpdated: createProfileDto.idUserLastUpdated ? {
          connect: { id: createProfileDto.idUserLastUpdated }
        } : undefined,
      },
      include: {
        owner: true,
        accesses: {
          include: {
            module: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.admin.profile.findMany({
      include: {
        owner: true,
        accesses: {
          include: {
            module: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.admin.profile.findUnique({
      where: { id },
      include: {
        owner: true,
        accesses: {
          include: {
            module: true,
          },
        },
      },
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.admin.profile.update({
      where: { id },
      data: {
        name: updateProfileDto.name,
        owner: updateProfileDto.idOwner ? {
          connect: { id: updateProfileDto.idOwner }
        } : undefined,
        userRegistration: updateProfileDto.idUserRegistration ? {
          connect: { id: updateProfileDto.idUserRegistration }
        } : undefined,
        userLastUpdated: updateProfileDto.idUserLastUpdated ? {
          connect: { id: updateProfileDto.idUserLastUpdated }
        } : undefined,
      },
      include: {
        owner: true,
        accesses: {
          include: {
            module: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.admin.profile.delete({
      where: { id },
    });
  }
}

