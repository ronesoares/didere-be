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
import { SystemService } from '../service/system.service';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';
import { JoiValidation } from '../../../common/decorators/joi-validation.decorator';
import { createSystemSchema, updateSystemSchema } from '../../../common/schemas/system.schema';

@ApiTags('systems')
@Controller('systems')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new system' })
  @ApiResponse({ status: 201, description: 'System created successfully.' })
  @JoiValidation(createSystemSchema)
  create(@Body() createSystemDto: CreateSystemDto) {
    return this.systemService.create(createSystemDto);
  }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get all systems' })
  @ApiResponse({ status: 200, description: 'List of systems.' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.systemService.findAll(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Get system by ID' })
  @ApiResponse({ status: 200, description: 'System found.' })
  @ApiResponse({ status: 404, description: 'System not found.' })
  findOne(@Param('id') id: string) {
    return this.systemService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update system' })
  @ApiResponse({ status: 200, description: 'System updated successfully.' })
  @ApiResponse({ status: 404, description: 'System not found.' })
  @JoiValidation(updateSystemSchema)
  update(@Param('id') id: string, @Body() updateSystemDto: UpdateSystemDto) {
    return this.systemService.update(+id, updateSystemDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete system' })
  @ApiResponse({ status: 200, description: 'System deleted successfully.' })
  @ApiResponse({ status: 404, description: 'System not found.' })
  remove(@Param('id') id: string) {
    return this.systemService.remove(+id);
  }
}

