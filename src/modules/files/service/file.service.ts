import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/service/prisma.service';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async create(createFileDto: CreateFileDto) {
    return this.prisma.files.file.create({
      data: {
        name: createFileDto.name,
        type: createFileDto.type,
        size: createFileDto.size,
        idModule: createFileDto.idModule,
        idKeyModule: createFileDto.idKeyModule,
        idOwner: createFileDto.idOwner,
        idSystem: createFileDto.idSystem,
        idCreationUser: createFileDto.idCreationUser,
        creationDate: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.files.file.findMany({
      orderBy: {
        creationDate: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.files.file.findUnique({
      where: { id },
    });
  }

  async findByModule(idModule: number, idKeyModule: number) {
    return this.prisma.files.file.findMany({
      where: {
        idModule,
        idKeyModule,
      },
      orderBy: {
        creationDate: 'desc',
      },
    });
  }

  async findByOwner(idOwner: number) {
    return this.prisma.files.file.findMany({
      where: { idOwner },
      orderBy: {
        creationDate: 'desc',
      },
    });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    return this.prisma.files.file.update({
      where: { id },
      data: {
        name: updateFileDto.name,
        type: updateFileDto.type,
        size: updateFileDto.size,
        idModule: updateFileDto.idModule,
        idKeyModule: updateFileDto.idKeyModule,
        idOwner: updateFileDto.idOwner,
        idSystem: updateFileDto.idSystem,
        idCreationUser: updateFileDto.idCreationUser,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.files.file.delete({
      where: { id },
    });
  }

  async downloadFile(id: number): Promise<Buffer> {
    const file = await this.findOne(id);
    
    // Here you would implement the actual file download logic
    // This could involve downloading from FTP, S3, local filesystem, etc.
    // For now, returning a placeholder buffer
    return Buffer.from(`File content for ${file.name}`);
  }
}