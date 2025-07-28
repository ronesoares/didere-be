import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ModuleService } from '../service/module.service';
import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createModuleSchema, updateModuleSchema } from '../../../common/schemas/module.schema';

@ApiTags('modules')
@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new module' })
  @ApiResponse({ status: 201, description: 'Module created successfully.' })
  @JoiValidation(createModuleSchema)
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get all modules' })
  @ApiResponse({ status: 200, description: 'List of modules.' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.moduleService.findAll(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get module by ID' })
  @ApiResponse({ status: 200, description: 'Module found.' })
  @ApiResponse({ status: 404, description: 'Module not found.' })
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update module' })
  @ApiResponse({ status: 200, description: 'Module updated successfully.' })
  @ApiResponse({ status: 404, description: 'Module not found.' })
  @JoiValidation(updateModuleSchema)
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(+id, updateModuleDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete module' })
  @ApiResponse({ status: 200, description: 'Module deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Module not found.' })
  remove(@Param('id') id: string) {
    return this.moduleService.remove(+id);
  }
}

