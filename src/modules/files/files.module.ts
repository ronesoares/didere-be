import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';
import { FileService } from './service/file.service';
import { PrismaService } from '../../common/service/prisma.service';

@Module({
  controllers: [FileController],
  providers: [
    FileService,
    PrismaService,
  ],
  exports: [
    FileService,
  ],
})
export class FilesModule {}

