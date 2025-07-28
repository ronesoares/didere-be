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
import { FeatureService } from '../service/feature.service';
import { Public } from '../../../common/decorators/public.decorator';

@ApiTags('features')
@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a new feature' })
  @ApiResponse({ status: 201, description: 'Feature created successfully.' })
  create(@Body() createFeatureDto: { name: string, description: string }) {
    return this.featureService.create(createFeatureDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all features (Public)' })
  @ApiResponse({ status: 200, description: 'List of features.' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.featureService.findAll();
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: 'Search features by name (Public)' })
  @ApiResponse({ status: 200, description: 'Search results.' })
  search(@Query('name') name: string) {
    return this.featureService.search(name);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get feature by ID (Public)' })
  @ApiResponse({ status: 200, description: 'Feature found.' })
  @ApiResponse({ status: 404, description: 'Feature not found.' })
  findOne(@Param('id') id: string) {
    return this.featureService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Update feature' })
  @ApiResponse({ status: 200, description: 'Feature updated successfully.' })
  @ApiResponse({ status: 404, description: 'Feature not found.' })
  update(@Param('id') id: string, @Body() updateFeatureDto: { name?: string; description?: string }) {
    return this.featureService.update(+id, updateFeatureDto);
  }

  @Delete(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Delete feature' })
  @ApiResponse({ status: 200, description: 'Feature deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Feature not found.' })
  remove(@Param('id') id: string) {
    return this.featureService.remove(+id);
  }
}

