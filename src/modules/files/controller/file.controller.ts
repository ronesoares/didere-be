import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { FileService } from '../service/file.service';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createFileSchema, updateFileSchema } from '../../../common/schemas/file.schema';
import { Public } from '../../../common/decorators/public.decorator';

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @JoiValidation(createFileSchema)
  @ApiOperation({ summary: 'Criar novo arquivo' })
  @ApiResponse({ status: 201, description: 'Arquivo criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os arquivos' })
  @ApiResponse({ status: 200, description: 'Lista de arquivos retornada com sucesso.' })
  @ApiQuery({ name: 'moduleId', required: false, description: 'Filtrar por módulo' })
  @ApiQuery({ name: 'keyModuleId', required: false, description: 'Filtrar por chave do módulo' })
  @ApiQuery({ name: 'ownerId', required: false, description: 'Filtrar por proprietário' })
  findAll(@Query() filters: any) {
    if (filters.moduleId && filters.keyModuleId) {
      return this.fileService.findByModule(
        parseInt(filters.moduleId),
        parseInt(filters.keyModuleId),
      );
    }
    
    if (filters.ownerId) {
      return this.fileService.findByOwner(parseInt(filters.ownerId));
    }

    return this.fileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar arquivo por ID' })
  @ApiResponse({ status: 200, description: 'Arquivo encontrado.' })
  @ApiResponse({ status: 404, description: 'Arquivo não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.findOne(id);
  }

  @Public()
  @Get(':id/download')
  @ApiOperation({ summary: 'Download de arquivo (Público)' })
  @ApiResponse({ status: 200, description: 'Arquivo baixado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Arquivo não encontrado.' })
  async download(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const file = await this.fileService.findOne(id);
    const fileBuffer = await this.fileService.downloadFile(id);
    
    res.set({
      'Content-Type': file.type || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.name}"`,
      'Content-Length': fileBuffer.length,
    });
    
    res.send(fileBuffer);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @JoiValidation(updateFileSchema)
  @ApiOperation({ summary: 'Atualizar arquivo' })
  @ApiResponse({ status: 200, description: 'Arquivo atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Arquivo não encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFileDto: UpdateFileDto,
  ) {
    return this.fileService.update(id, updateFileDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Remover arquivo' })
  @ApiResponse({ status: 200, description: 'Arquivo removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Arquivo não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.remove(id);
  }
}

