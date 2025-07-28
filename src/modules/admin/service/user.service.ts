import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Check if email already exists
    const existingUser = await this.prisma.admin.user.findUnique({
      where: { login: createUserDto.login, idOwner: 2 },
    });

    if (existingUser) {
      throw new ConflictException(`User with email ${createUserDto.login} already exists`);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.admin.user.create({
      data: {
        password: hashedPassword,
        login: createUserDto.login,
        name: createUserDto.name,
        status: 'A',
        idOwner: 2,
        idProfile: 2,
        creationDate: new Date(),
      },
      include: {
        profile: true,
        owner: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      this.prisma.admin.user.findMany({
        where: { idOwner: 2 },
        skip,
        take: limit,
        include: {
          profile: true,
          owner: true,
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.admin.user.count({
        where: { idOwner: 2 },
      }),
    ]);

    // Remove passwords from response
    const sanitizedUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return {
      data: sanitizedUsers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.admin.user.findUnique({
      where: { id, idOwner: 2 },
      include: {
        profile: true,
        owner: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByLogin(login: string) {
    return this.prisma.admin.user.findUnique({
      where: { login, idOwner: 2 },
      include: {
        profile: true,
        owner: true,
      },
    });
  }

  async createFromGoogle(googleUser: { login: string; name: string; picture?: string }) {
    // Generate a random password for Google users
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    return this.prisma.admin.user.create({
      data: {
        login: googleUser.login,
        name: googleUser.name,
        password: hashedPassword,
        status: 'A',
        isUserOwner: 'N',
        profile: {
          connect: { id: 2 }
        },
        owner: {
          connect: { id: 2 }
        },
        creationDate: new Date(),
      },
      include: {
        profile: true,
        owner: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.prisma.admin.user.update({
      where: { id, idOwner: 2 },
      data: updateUserDto,
      include: {
        profile: true,
        owner: true,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: number) {
    await this.findOne(id);
    
    return this.prisma.admin.user.delete({
      where: { id, idOwner: 2 },
    });
  }
}

