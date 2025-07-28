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
import { TypeActivityService } from '../service/type-activity.service';
import { Public } from '../../../common/decorators/public.decorator';

@ApiTags('type-activities')
@Controller('type-activities')
export class TypeActivityController {
  constructor(private readonly typeActivityService: TypeActivityService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new type activity' })
  @ApiResponse({ status: 201, description: 'Type activity created successfully.' })
  create(@Body() createTypeActivityDto: { name: string; description?: string }) {
    return this.typeActivityService.create(createTypeActivityDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all type activities (Public)' })
  @ApiResponse({ status: 200, description: 'List of type activities.' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.typeActivityService.findAll();
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: 'Search type activities by name (Public)' })
  @ApiResponse({ status: 200, description: 'Search results.' })
  search(@Query('name') name: string) {
    return this.typeActivityService.search(name);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get type activity by ID (Public)' })
  @ApiResponse({ status: 200, description: 'Type activity found.' })
  @ApiResponse({ status: 404, description: 'Type activity not found.' })
  findOne(@Param('id') id: string) {
    return this.typeActivityService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update type activity' })
  @ApiResponse({ status: 200, description: 'Type activity updated successfully.' })
  @ApiResponse({ status: 404, description: 'Type activity not found.' })
  update(@Param('id') id: string, @Body() updateTypeActivityDto: { name?: string; description?: string }) {
    return this.typeActivityService.update(+id, updateTypeActivityDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete type activity' })
  @ApiResponse({ status: 200, description: 'Type activity deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Type activity not found.' })
  remove(@Param('id') id: string) {
    return this.typeActivityService.remove(+id);
  }
}

