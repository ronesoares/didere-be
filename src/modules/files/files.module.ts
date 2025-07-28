import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';
import { FileService } from './service/file.service';
import { PrismaService } from '../../common/service/prisma.service';
import { FtpService } from './service/ftp.service';

@Module({
  controllers: [FileController],
  providers: [
    FileService,
    FtpService,
    PrismaService,
  ],
  exports: [
    FileService,
  ],
})
export class FilesModule {}

